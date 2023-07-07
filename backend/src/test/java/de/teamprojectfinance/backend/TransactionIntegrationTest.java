package de.teamprojectfinance.backend;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TransactionIntegrationTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    TransactionService transactionService;


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

                //Then
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").isNotEmpty())
                .andExpect(jsonPath("amount").value("13"))
                .andExpect(jsonPath("description").value("test"))
                .andExpect(jsonPath("category").value("INCOME"));


    }

    @DirtiesContext
    @Test
    void whenListEmpty_ThenReturnEmptyList() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/finance/")

                )

        // THEN
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("""
                        []
                        """));

    }

    @DirtiesContext
    @Test
    void whenUpdateATransactionReturnUpdatedTransaction() throws Exception{
        //Given

        String id = "0123";
        //When
        mockMvc.perform(
              MockMvcRequestBuilders.put("/api/finance/"+id)
         .contentType(MediaType.APPLICATION_JSON)
                .content("""
                                        {
                                            "description": "test",
                                            "amount": "13",
                                            "category": "INCOME"
                                        }
                                        """
                ))
        //Then
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").value("0123"))
                .andExpect(jsonPath("amount").value("13"))
                .andExpect(jsonPath("description").value("test"))
                .andExpect(jsonPath("category").value("INCOME"));
    }

    @DirtiesContext
    @Test
    void WhenDeleteATransactionThenReturnEmptyList() throws Exception{
        //Given
       Transaction givenTransaction = transactionService.addTransaction(new DtoTransaction( "test", 1234, TransactionCategory.INCOME));

        //When
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/finance/"+givenTransaction.getId())
        ).andExpect(status().isOk());
        //Then
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/finance/")
        ).andExpect(status().isOk())
                .andExpect(content().json("""
                    []
                """));
    }
}
