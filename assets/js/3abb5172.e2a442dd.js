"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8426],{8350:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>m,frontMatter:()=>i,metadata:()=>d,toc:()=>l});var n=a(5893),o=a(1151);const i={},r=void 0,d={id:"java-basic/map-enum-with-handler",title:"map-enum-with-handler",description:"Code",source:"@site/docs/java-basic/map-enum-with-handler.md",sourceDirName:"java-basic",slug:"/java-basic/map-enum-with-handler",permalink:"/docs/java-basic/map-enum-with-handler",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"T\u1ea1o 1 chain handler c\xf3 th\u1ee9 t\u1ef1 trong java",permalink:"/docs/java-basic/make-chain-handler"},next:{title:"Semaphore & Multi-thread",permalink:"/docs/java-basic/multi-thread"}},c={},l=[{value:"Code",id:"code",level:2}];function s(e){const t={code:"code",h2:"h2",pre:"pre",...(0,o.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"code",children:"Code"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-java",children:" private final ValidateComponent validate;\n\nprivate void validate(LeadManagementDto leadManagementDto) {\n    ProductValidate.getValidator(leadManagementDto.getProductId())\n            .ifPresent(validator -> validator.accept(leadManagementDto, validate));\n}\n"})}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-java",children:'package com.finx.lead.core.service.validate;\n\nimport com.finx.lead.core.domain.lead.dto.LeadManagementDto;\nimport com.finx.lead.core.repository.CampaignWhileListRepository;\nimport com.finx.spring.service.exception.ClientSideException;\n\nimport java.time.LocalDate;\n\nimport lombok.RequiredArgsConstructor;\nimport org.springframework.stereotype.Component;\n\n@Component\n@RequiredArgsConstructor\npublic class ValidateComponent {\n    private final CampaignWhileListRepository whiteListCustomer;\n\n    public void validateExpiredDateOffer(LeadManagementDto leadManagementDto) {\n        whiteListCustomer\n                .getWhiteListByProduct(leadManagementDto.getCifNumber(), leadManagementDto.getProductId())\n                .filter(whiteList -> whiteList.toDate().isAfter(LocalDate.now()))\n                .orElseThrow(() -> new ClientSideException("OFFER_EXPIRED", "Expired date offer"));\n    }\n}\n'})}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-java",children:"package com.finx.lead.core.service.validate;\n\nimport com.finx.lead.core.domain.lead.dto.LeadManagementDto;\nimport com.finx.loan.domain.Product;\nimport lombok.Getter;\n\nimport java.util.Map;\nimport java.util.Optional;\nimport java.util.function.BiConsumer;\nimport java.util.stream.Collectors;\nimport java.util.stream.Stream;\n\n@Getter\npublic enum ProductValidate {\n    OVERDRAFT(Product.OVERDRAFT, (dto, validate) -> validate.validateExpiredDateOffer(dto)),\n    ;\n\n    private final Product productId;\n    private final BiConsumer<LeadManagementDto, ValidateComponent> validateFunction;\n\n    private static final Map<Product, BiConsumer<LeadManagementDto, ValidateComponent>> map;\n\n    static {\n        map = Stream.of(ProductValidate.values())\n                .collect(Collectors.toMap(ProductValidate::getProductId, ProductValidate::getValidateFunction));\n    }\n\n    ProductValidate(\n            Product productId, BiConsumer<LeadManagementDto, ValidateComponent> validateFunction) {\n        this.productId = productId;\n        this.validateFunction = validateFunction;\n    }\n\n    public static Optional<BiConsumer<LeadManagementDto, ValidateComponent>> getValidator(String productId) {\n        try {\n            Product.valueOf(productId);\n        } catch (IllegalArgumentException e) {\n            return Optional.empty();\n        }\n        return Optional.ofNullable(map.get(Product.valueOf(productId)));\n    }\n}\n"})})]})}function m(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(s,{...e})}):s(e)}},1151:(e,t,a)=>{a.d(t,{Z:()=>d,a:()=>r});var n=a(7294);const o={},i=n.createContext(o);function r(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);