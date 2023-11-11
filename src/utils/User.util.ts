import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { VerifyTokenDTO, createUserDto, emailVerifyDTO } from 'src/user/dto/user.dto';

export const generateEmailVerificationToken = async (
  user: createUserDto,
  jwtService: JwtService,
) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const token = await jwtService.signAsync(
    {
      user: user,
      otp: otp,
    },

    { expiresIn: '30min', secret: process.env.EMAIL_VERIFICATION_TOKEN_SECRET },
  );
  return {token,otp};
};


export const validateEmailOtp=async(dto:emailVerifyDTO,jwtService:JwtService)=>{
const token = dto.token;
if(!token){
    throw new NotFoundException("Invalid Verification Token");
}
    try {
        const {user,otp} = await jwtService.verifyAsync(dto.token,{
            secret:process.env.EMAIL_VERIFICATION_TOKEN_SECRET
        });
        if(otp!==dto.otp) return new UnauthorizedException("Invalid Otp");
        return user as createUserDto;
    } catch (error) {
        return new UnauthorizedException("Invalid Access Token");
    }
}


export const validateToken=async(dto:VerifyTokenDTO,jwtService:JwtService)=>{
  const token = dto.token;
  if(!token){
      throw new NotFoundException("Invalid Verification Token");
  }
      try {
          const {user} = await jwtService.verifyAsync(dto.token,{
              secret:process.env.RESET_PASSWORD_TOKEN_SECRET
          });
          return user;
         
         
      } catch (error) {
        // console.log(error)
          throw new UnauthorizedException("Invalid Access Token");
      }
  }
  
  

