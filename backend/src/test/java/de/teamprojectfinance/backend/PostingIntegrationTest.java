package de.teamprojectfinance.backend;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class PostingIntegrationTest {
    @Autowired
    MockMvc mockMvc;
@DirtiesContext
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
                                            "amount": "13",
                                            "category": "INCOME"
                                        }
                                        """
                                ))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").isNotEmpty())
                .andExpect(jsonPath("amount").value("13"))
                .andExpect(jsonPath("description").value("test"))
                .andExpect(jsonPath("category").value("INCOME"));

        //Then

    }

  @DirtiesContext
    @Test
    void whenListEmpty_ThenReturnEmptyList() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/finance/")

        )
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("""
                                            []
                                            """));
        // THEN
    }


}
