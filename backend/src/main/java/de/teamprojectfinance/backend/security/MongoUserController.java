package de.teamprojectfinance.backend.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class MongoUserController {

    @GetMapping("me")
    public String getUserInfo(Principal principal){
        if (principal == null){
            return "anonymousUser";
        }
        return principal.getName();
    }

    @GetMapping("me2")
    public String getUserInfo2(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
