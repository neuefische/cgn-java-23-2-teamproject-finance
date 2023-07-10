package de.teamprojectfinance.backend;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("transactions")
public class Transaction {

    @Id
    private String id;

    private String description;

    private BigDecimal amount;

    private TransactionCategory category;


}
