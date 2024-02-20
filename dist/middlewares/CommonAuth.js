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
exports.Authentication = void 0;
const utility_1 = require("../utility");
const Authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = yield (0, utility_1.Validate_Signature)(req);
        if (validate) {
            next();
        }
        else {
            res.status(401).json({ message: "User is not authorized" });
        }
    }
    catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.Authentication = Authentication;
//# sourceMappingURL=CommonAuth.js.map