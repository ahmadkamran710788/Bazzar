"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const customerSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, requied: true },
    salt: { type: String, requied: true },
    firstName: { type: String, requied: true },
    lastName: { type: String, requied: true },
    address: { type: String, requied: true },
    phone: { type: String, requied: true },
    verified: { type: Boolean, requied: true },
    otp: { type: Number, requied: true },
    otp_expiry: { type: Number, requied: true },
    lat: { type: Number },
    lng: { type: Number },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password,
                delete ret.salt,
                delete ret.__v,
                delete ret.createdAt,
                delete ret.updatedAt;
        },
    },
    timestamps: true,
});
const Customer = mongoose_1.default.model("customer", customerSchema);
exports.Customer = Customer;
//# sourceMappingURL=customerModel.js.map