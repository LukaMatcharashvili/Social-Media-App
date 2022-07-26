import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.schema';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async verifyEmail(userId: string, verificationToken: string): Promise<User> {
    try {
      const user = await this.userService.findById(userId);

      if (user.verificationToken === verificationToken) {
        user.verified = true;
        const updatedUser = await this.userService.changeVerifyToTrue(userId);
        return updatedUser;
      } else if (user.verificationToken !== verificationToken) {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getByEmail(email);
    let isValid;
    if (user) {
      isValid = await bcrypt.compare(password, user.password);
    }
    if (isValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    if (!user.verified) throw Error('Verify Email');
    const payload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async receiveEmailForPasswordReset(email: string) {
    try {
      const user = await this.userService.getByEmail(email);
      if (user) {
        const resetToken = await this.userService.createPasswordResetToken(
          user.id,
        );
        this.emailService.sendPasswordResetEmail(
          email,
          resetToken.userId,
          resetToken.token,
        );
      } else {
        throw Error('The provided email is invalid!');
      }
      return { message: 'Password Reset Link Has Been Sent!' };
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(userId: string, resetTokenP: string, password: string) {
    try {
      const resetToken = await this.userService.verifyPasswordResetToken(
        userId,
        resetTokenP,
      );
      if (!resetToken) {
        throw Error('The provided token is invalid!');
      }
      await this.userService.changePassword(userId, password);
      await this.userService.deletePasswordResetToken(resetTokenP);
      return { message: 'Your password was successfully changed!' };
    } catch (error) {
      throw error;
    }
  }
}
