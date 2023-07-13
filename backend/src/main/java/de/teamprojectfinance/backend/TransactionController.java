package de.teamprojectfinance.backend;


import jakarta.validation.Valid;
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
    public Transaction addTransaction(@Valid @RequestBody DtoTransaction dtoTransaction) {
        return transactionService.addTransaction(dtoTransaction);
    }

    @PutMapping("{id}")
    public Transaction updateTransaction(@PathVariable("id") String id, @Valid @RequestBody DtoTransaction dtoTransaction){

        return transactionService.updateTransaction(dtoTransaction, id);

    }

    @DeleteMapping("{id}")
    public void deleteTransaction(@PathVariable("id") String id){
        transactionService.deleteTransaction(id);
    }

}
