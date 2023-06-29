package de.teamprojectfinance.backend;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class PostingIntegrationTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    PostingRepo postingRepo;

    @Test
    void WhenAddingPosting_ThenReturnPosting() throws Exception {
        //Given

        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/finance/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                            "description": "test",
                                            "amount": "13"
                                        }
                                        """
                                ))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").isNotEmpty())
                .andExpect(jsonPath("amount").value("13"))
                .andExpect(jsonPath("description").value("test"));

        //Then

    }


}
