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
                        )
        );
        //Then
        List<PostingModel> postingModels = new ArrayList<>(List.of
                (new PostingModel("test", 13)));
        Assertions.assertThat(postingModels)
                .containsExactly(new PostingModel("test", 13));
    }


}
