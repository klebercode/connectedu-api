import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './../shared/auth.service';

@Resolver()
export class LoginResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  userLogin(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<String> {
    const token = this.authService.userLogin(email, password);
    return token;
  }
}
