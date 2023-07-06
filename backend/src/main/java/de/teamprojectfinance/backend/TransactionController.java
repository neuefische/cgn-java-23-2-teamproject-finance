package de.teamprojectfinance.backend;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/finance/")
public class TransactionController {

    private final TransactionService transactionService;

    TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    List<Transaction> getAllTransactions(){
        return transactionService.getAllTransactions();
    }


    @PostMapping
    public Transaction addTransaction(@RequestBody DtoTransaction dtoTransaction) {
        return transactionService.addTransaction(dtoTransaction);
    }

    @PutMapping
    public Transaction updateTransaction(@RequestBody Transaction transaction){

        return transactionService.

    }

}
