# Map enum with handler

## Tóm tắt
- Map enum với handler function, tăng tính mở rộng
  
## Code
```java
 private final ValidateComponent validate;

private void validate(LeadManagementDto leadManagementDto) {
    ProductValidate.getValidator(leadManagementDto.getProductId())
            .ifPresent(validator -> validator.accept(leadManagementDto, validate));
}
```

```java
package com.finx.lead.core.service.validate;

import com.finx.lead.core.domain.lead.dto.LeadManagementDto;
import com.finx.lead.core.repository.CampaignWhileListRepository;
import com.finx.spring.service.exception.ClientSideException;

import java.time.LocalDate;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ValidateComponent {
    private final CampaignWhileListRepository whiteListCustomer;

    public void validateExpiredDateOffer(LeadManagementDto leadManagementDto) {
        whiteListCustomer
                .getWhiteListByProduct(leadManagementDto.getCifNumber(), leadManagementDto.getProductId())
                .filter(whiteList -> whiteList.toDate().isAfter(LocalDate.now()))
                .orElseThrow(() -> new ClientSideException("OFFER_EXPIRED", "Expired date offer"));
    }
}
```

```java
package com.finx.lead.core.service.validate;

import com.finx.lead.core.domain.lead.dto.LeadManagementDto;
import com.finx.loan.domain.Product;
import lombok.Getter;

import java.util.Map;
import java.util.Optional;
import java.util.function.BiConsumer;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Getter
public enum ProductValidate {
    OVERDRAFT(Product.OVERDRAFT, (dto, validate) -> validate.validateExpiredDateOffer(dto)),
    ;

    private final Product productId;
    private final BiConsumer<LeadManagementDto, ValidateComponent> validateFunction;

    private static final Map<Product, BiConsumer<LeadManagementDto, ValidateComponent>> map;

    static {
        map = Stream.of(ProductValidate.values())
                .collect(Collectors.toMap(ProductValidate::getProductId, ProductValidate::getValidateFunction));
    }

    ProductValidate(
            Product productId, BiConsumer<LeadManagementDto, ValidateComponent> validateFunction) {
        this.productId = productId;
        this.validateFunction = validateFunction;
    }

    public static Optional<BiConsumer<LeadManagementDto, ValidateComponent>> getValidator(String productId) {
        try {
            Product.valueOf(productId);
        } catch (IllegalArgumentException e) {
            return Optional.empty();
        }
        return Optional.ofNullable(map.get(Product.valueOf(productId)));
    }
}
```