package de.teamprojectfinance.backend;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/finance/")
public class TransactionController {

    private final TransactionService postingService;

    TransactionController(TransactionService postingService) {
        this.postingService = postingService;
    }

    @GetMapping
    List<Transaction> getAllPostings(){
        return postingService.getAllPostings();
    }


    @PostMapping
    public Transaction addPosting(@RequestBody DtoTransaction newPostingModel) {
        return postingService.addPosting(newPostingModel);
    }
}
