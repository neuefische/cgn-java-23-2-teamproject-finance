package de.teamprojectfinance.backend.security;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class MongoUserIntegrationTest {

    @Autowired
    MockMvc mockMvc;


    @Test
    void whenIsNotLoggedIn_thenReturnAnonymous() throws Exception {

        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/users/me2")


                )
                .andExpect(content().contentType(MediaType.TEXT_PLAIN_VALUE+ ";charset=UTF-8"))
                .andExpect(content().string(
                        "anonymousUser"

                ))
                .andExpect(status().isOk());


    }


}
