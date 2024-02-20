"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCustomerProfile = exports.GetCustomerProfile = exports.RequestOpt = exports.CustomerVerify = exports.CustomerLogin = exports.CustomerSignup = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Customer_dto_1 = require("../dto/Customer.dto");
const utility_1 = require("../utility");
const models_1 = require("../models");
const CustomerSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerInputs = (0, class_transformer_1.plainToClass)(Customer_dto_1.CreateCustomerInput, req.body);
        const inputErrors = yield (0, class_validator_1.validate)(customerInputs, {
            validationError: { target: true },
        });
        if (inputErrors.length > 0) {
            return res.status(400).json(inputErrors);
        }
        const { email, password, phone } = customerInputs;
        const existingCustomer = yield models_1.Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(401).json({ message: "Customer already exists." });
        }
        const salt = yield (0, utility_1.generate_Salt)();
        const hash = yield (0, utility_1.hashPassword)(password, salt);
        const { otp, expiry } = (0, utility_1.GenerateOpt)();
        const result = yield models_1.Customer.create({
            email,
            password: hash,
            salt,
            firstName: "",
            lastName: "",
            address: "",
            phone,
            verified: false,
            otp: otp,
            otp_expiry: expiry,
            lat: 0,
            lng: 0,
        });
        const signature = (0, utility_1.GenerateSignature)({
            _id: result._id,
            email: result.email,
            verified: result.verified,
        });
        // Send the OTP to the customer (if needed)
        // await onRequestOTP(otp, phone);
        return res.json({
            signature,
            verified: result.verified,
            email: result.email,
            opt: result.otp,
        });
    }
    catch (error) {
        console.error("Error during customer signup:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.CustomerSignup = CustomerSignup;
const CustomerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const LoginInput = (0, class_transformer_1.plainToClass)(Customer_dto_1.CustomerLoginInput, req.body);
        const LoginErrors = yield (0, class_validator_1.validate)(LoginInput, {
            validationError: { target: false },
        });
        if (LoginErrors.length > 0) {
            return res.status(400).json(LoginErrors);
        }
        const { email, password } = LoginInput;
        const customer = yield models_1.Customer.findOne({ email });
        if (customer) {
            const validation = yield (0, utility_1.valid_password)(password, customer.password);
            if (validation) {
                const signature = yield (0, utility_1.GenerateSignature)({
                    _id: customer.id,
                    email: customer.email,
                    verified: customer.verified,
                });
                return res.status(200).json({
                    signature: signature,
                    verify: customer.verified,
                    email: customer.email,
                });
            }
            else {
                return res.status(404).json({ message: "Password doesn't match" });
            }
        }
        return res.status(404).json({ message: "Customer not found" });
    }
    catch (error) {
        // Handle any unexpected errors
        next(error);
    }
});
exports.CustomerLogin = CustomerLogin;
const CustomerVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { opt } = req.body;
    const customer = req.user;
    if (customer) {
        const profile = yield models_1.Customer.findById(customer._id);
        if (profile) {
            if (profile.otp == parseInt(opt) && profile.otp_expiry >= new Date()) {
                profile.verified = true;
                const updarteCustomerResponse = yield profile.save();
                const signature = yield (0, utility_1.GenerateSignature)({
                    _id: updarteCustomerResponse.id,
                    email: updarteCustomerResponse.email,
                    verified: updarteCustomerResponse.verified,
                });
                return res.status(201).json({
                    signature: signature,
                    verify: updarteCustomerResponse.verified,
                    email: updarteCustomerResponse.email,
                });
            }
        }
    }
    return res.status(400).json({ message: "Error with OTP Validation" });
});
exports.CustomerVerify = CustomerVerify;
const RequestOpt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const customer = yield models_1.Customer.findById(user._id);
        if (customer) {
            const { otp, expiry } = (0, utility_1.GenerateOpt)();
            customer.otp = otp;
            customer.otp_expiry = expiry;
            yield customer.save();
            //await onRequestOTP(otp, customer.phone);
            return res.status(200).json(`otp send to the customer :${otp}`);
        }
    }
    return res.status(401).json("something went wrong");
});
exports.RequestOpt = RequestOpt;
const GetCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const customer = yield models_1.Customer.findById(user._id);
        if (customer) {
            //await onRequestOTP(otp, customer.phone);
            return res.status(200).json(customer);
        }
    }
    return res.status(404).json({ message: "Some thing went wrong" });
});
exports.GetCustomerProfile = GetCustomerProfile;
const EditCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const profileInput = (0, class_transformer_1.plainToClass)(Customer_dto_1.CustomerProfileInput, req.body);
    const inputErrors = yield (0, class_validator_1.validate)(profileInput, {
        validationError: { target: false },
    });
    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }
    const { firstName, lastName, address } = profileInput;
    if (user) {
        const customer = yield models_1.Customer.findById(user._id);
        if (customer) {
            customer.firstName = firstName;
            customer.lastName = lastName;
            customer.address = address;
            const person = yield customer.save();
            //await onRequestOTP(otp, customer.phone);
            return res.status(200).json(person);
        }
    }
    return res.status(404).json({ message: "Some thing went wrong" });
});
exports.EditCustomerProfile = EditCustomerProfile;
//# sourceMappingURL=CustomerController.js.map