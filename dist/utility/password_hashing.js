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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate_Signature = exports.GenerateSignature = exports.valid_password = exports.hashPassword = exports.generate_Salt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const generate_Salt = () => __awaiter(void 0, void 0, void 0, function* () { return yield bcrypt_1.default.genSalt(); });
exports.generate_Salt = generate_Salt;
const hashPassword = (password, salt) => bcrypt_1.default.hash(password, salt);
exports.hashPassword = hashPassword;
const valid_password = (userPassword, hash) => {
    return bcrypt_1.default.compare(userPassword, hash);
};
exports.valid_password = valid_password;
const GenerateSignature = (payload) => {
    const signature = jsonwebtoken_1.default.sign(payload, config_1.secretKey, { expiresIn: "1d" });
    return signature;
};
exports.GenerateSignature = GenerateSignature;
const Validate_Signature = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = req.get("Authorization");
    if (signature) {
        const payload = (yield jsonwebtoken_1.default.verify(signature.split(" ")[1], config_1.secretKey));
        req.user = payload;
        return true;
    }
    return false;
});
exports.Validate_Signature = Validate_Signature;
//# sourceMappingURL=password_hashing.js.map