import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'TopSecret',
    });
  }

  async validate(payload: any) {
    // puedes añadir más información si importamos el usersService y llamamos a la BBDD para traernos más info
    return {
      id: payload.id,
      name: payload.name,
    };
  }
}
