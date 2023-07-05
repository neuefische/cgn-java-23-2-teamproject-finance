package de.teamprojectfinance.backend;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepo transactionRepo;

    private final IdService idService;

    public TransactionService(TransactionRepo transactionRepo, IdService idService){
        this.transactionRepo = transactionRepo;
        this.idService = idService;
    }

    public Transaction addTransaction(DtoTransaction dtoTransaction) {
        return transactionRepo.addPosting(new Transaction(idService.createRandomId(),dtoTransaction.getDescription(), dtoTransaction.getAmount(), dtoTransaction.getCategory()));
    }


    public List<Transaction> getAllTransactions() {
        return transactionRepo.getAllTransactions();
    }
}
