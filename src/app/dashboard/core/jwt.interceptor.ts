import { HttpInterceptorFn } from '@angular/common/http';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");
  if(token){
    const authorization = `Bearer ${token}`;
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authorization)
    });
    return next(authReq);
  }else{
    return next(req);
  }
};
