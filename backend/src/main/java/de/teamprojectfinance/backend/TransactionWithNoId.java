package de.teamprojectfinance.backend;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionWithNoId {

    @NotBlank
    @Size(min = 6, max = 128, message = "Benutzername muss zwischen 6 und 128 Zeichen lang sein")
    private String description;
    @NotNull
    @Positive
    private BigDecimal amount;

    private TransactionCategory category;

    private Date date;

}
