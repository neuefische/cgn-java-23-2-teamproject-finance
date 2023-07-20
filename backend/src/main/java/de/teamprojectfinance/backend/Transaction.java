package de.teamprojectfinance.backend;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.Date;


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

    private Date date;


}
