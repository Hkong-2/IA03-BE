import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async register(email: string, password: string) {
        const existing = await this.userModel.findOne({ email });
        if (existing) throw new BadRequestException('Email already exists');

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new this.userModel({
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return { message: 'User registered successfully' };
    }
}
