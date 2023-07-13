package de.teamprojectfinance.backend;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TransactionIntegrationTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    TransactionService transactionService;
    @Autowired
    ObjectMapper objectMapper;

    @DirtiesContext
    @Test
    @WithMockUser
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
                                )
                                .with(csrf())
                )

                //Then
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").isNotEmpty())
                .andExpect(jsonPath("amount").value("13"))
                .andExpect(jsonPath("description").value("test"))
                .andExpect(jsonPath("category").value("INCOME"));


    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenListEmpty_ThenReturnEmptyList() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/finance/")
                                .with(csrf())
                )

                // THEN
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("""
                        []
                        """));

    }

    @DirtiesContext
    @Test
    @WithMockUser
    void whenUpdateATransactionReturnUpdatedTransaction() throws Exception {
        //Given

        String id = "0123";
        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/finance/" + id)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                            "description": "test",
                                            "amount": "13",
                                            "category": "INCOME"
                                        }
                                        """
                                ).with(csrf())
                )
                //Then
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").value("0123"))
                .andExpect(jsonPath("amount").value("13"))
                .andExpect(jsonPath("description").value("test"))
                .andExpect(jsonPath("category").value("INCOME"));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void WhenDeleteATransactionThenReturnEmptyList() throws Exception {
        //Given

        String saveResult =   mockMvc.perform(
                  MockMvcRequestBuilders.post("/api/finance/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                        {  \s
                                            "description": "test",
                                            "amount": "1234",
                                            "category": "INCOME"
                                        }
                                        """
                        )

                        .with(csrf())
        )
                .andReturn()
                .getResponse()
                .getContentAsString();
        Transaction saveResultTransaction = objectMapper.readValue(saveResult, Transaction.class);
        //When

        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/finance/" + saveResultTransaction.getId())
                        .with(csrf())
        ).andExpect(status().isOk());
        //Then
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/finance/")
                                .with(csrf())
                ).andExpect(status().isOk())
                .andExpect(content().json("""
                            []
                        """));
    }
}
