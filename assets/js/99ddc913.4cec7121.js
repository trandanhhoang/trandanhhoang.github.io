"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2618],{6859:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>u,frontMatter:()=>s,metadata:()=>l,toc:()=>o});var a=i(5893),t=i(1151);const s={sidebar_position:1},r="Effective java",l={id:"ignore/effective-java",title:"Effective java",description:"Chapter 2: Creating and Destroying Objects",source:"@site/docs/ignore/effective-java.md",sourceDirName:"ignore",slug:"/ignore/effective-java",permalink:"/docs/ignore/effective-java",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Bubble sort",permalink:"/docs/ignore/bubble-sort"},next:{title:"Heap",permalink:"/docs/ignore/heap"}},c={},o=[{value:"Chapter 2: Creating and Destroying Objects",id:"chapter-2-creating-and-destroying-objects",level:2},{value:"Use static factory method instead of constructor",id:"use-static-factory-method-instead-of-constructor",level:3},{value:"Use builder when face with many constructor parameters",id:"use-builder-when-face-with-many-constructor-parameters",level:3},{value:"DI to hardwiring resources",id:"di-to-hardwiring-resources",level:3},{value:"Avoid creating unnecessary object",id:"avoid-creating-unnecessary-object",level:3},{value:"Prefer try-with-resources to try-finally.",id:"prefer-try-with-resources-to-try-finally",level:3},{value:"Chapter 3: Methods common to all objects",id:"chapter-3-methods-common-to-all-objects",level:2},{value:"Obey the general contract when overriding equals",id:"obey-the-general-contract-when-overriding-equals",level:3},{value:"the recipe for a high-quality equals method:",id:"the-recipe-for-a-high-quality-equals-method",level:4},{value:"always override hashCode when override equals",id:"always-override-hashcode-when-override-equals",level:3},{value:"Override clone",id:"override-clone",level:3},{value:"chapter 4: Classes and Interfaces",id:"chapter-4-classes-and-interfaces",level:2},{value:"Minimize the acce\\ssibility of classes and members",id:"minimize-the-accessibility-of-classes-and-members",level:3},{value:"Chapter 5:",id:"chapter-5",level:2},{value:"ENUM",id:"enum",level:3},{value:"Enum instead of bit field",id:"enum-instead-of-bit-field",level:3},{value:"EnumMap",id:"enummap",level:3},{value:"Annotations",id:"annotations",level:3},{value:"Chapter 7: Lambdas and Streams",id:"chapter-7-lambdas-and-streams",level:2},{value:"Prefer lambdas to anonymous classes",id:"prefer-lambdas-to-anonymous-classes",level:3},{value:"Favor the use of standard functional interfaces",id:"favor-the-use-of-standard-functional-interfaces",level:3},{value:"Use caution when making stream parallel",id:"use-caution-when-making-stream-parallel",level:3},{value:"CHapter 8 : Methods",id:"chapter-8--methods",level:2},{value:"Use overloading judiciously",id:"use-overloading-judiciously",level:3},{value:"use optional judiciously",id:"use-optional-judiciously",level:3},{value:"Write documents",id:"write-documents",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"effective-java",children:"Effective java"}),"\n",(0,a.jsx)(n.h2,{id:"chapter-2-creating-and-destroying-objects",children:"Chapter 2: Creating and Destroying Objects"}),"\n",(0,a.jsx)(n.h3,{id:"use-static-factory-method-instead-of-constructor",children:"Use static factory method instead of constructor"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"public static Boolean valueOf(boolean b) {\n    return b ? Boolean.TRUE : Boolean.FALSE;\n}\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Naming: from, of, getInstance.","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"Date d = Date.from(instant)"}),";"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"Set<Rank> faceCards = EnumSet.of(JACK, QUEEN, KING)"}),";"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"StackWalker luke = StackWalker.getInstance(options)"}),";"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"use-builder-when-face-with-many-constructor-parameters",children:"Use builder when face with many constructor parameters"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"// Builder Pattern\npublic class NutritionFacts {\n    private final int servingSize;\n    private final int carbohydrate;\n    public static class Builder {\n        // Required parameters\n        private final int servingSize;\n        private int carbohydrate = 0;\n        public Builder(int servingSize, int servings) {\n            this.servingSize = servingSize;\n        }\n        public Builder carbohydrate(int val)\n        { carbohydrate = val; return this; }\n        public NutritionFacts build() {\n            return new NutritionFacts(this);\n        }\n    }\n    private NutritionFacts(Builder builder) {\n        servingSize = builder.servingSize;\n        carbohydrate = builder.carbohydrate;\n    }\n}\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"NutritionFacts cocaCola = new NutritionFacts.Builder(240)\n    .carbohydrate(27).build();\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Hierarchies"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:'// Builder pattern for class hierarchies\npublic abstract class Pizza {\n    public enum Topping { HAM, MUSHROOM, ONION, PEPPER, SAUSAGE }\n    final Set<Topping> toppings;\n    abstract static class Builder<T extends Builder<T>> {\n        EnumSet<Topping> toppings = EnumSet.noneOf(Topping.class);\n        public T addTopping(Topping topping) {\n            toppings.add(Objects.requireNonNull(topping));\n            return self();\n        }\n        abstract Pizza build();\n        // Subclasses must override this method to return "this"\n        protected abstract T self();\n    }\n    Pizza(Builder<?> builder) {\n        toppings = builder.toppings.clone(); // See Item 50\n    }\n}\n'})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"public class NyPizza extends Pizza {\n    public enum Size { SMALL, MEDIUM, LARGE }\n    private final Size size;\n    public static class Builder extends Pizza.Builder<Builder> {\n        private final Size size;\n        public Builder(Size size) {\n        this.size = Objects.requireNonNull(size);\n        }\n        @Override public NyPizza build() {\n        return new NyPizza(this);\n        }\n        @Override protected Builder self() { return this; }\n    }\n    private NyPizza(Builder builder) {\n        super(builder);\n        size = builder.size;\n    }\n}\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"NyPizza pizza = new NyPizza.Builder(SMALL)\n.addTopping(SAUSAGE).addTopping(ONION).build();\n"})}),"\n",(0,a.jsx)(n.h3,{id:"di-to-hardwiring-resources",children:"DI to hardwiring resources"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["example with spellchecker + dictionary:","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"spellchecker for each language need its own dictionary"}),"\n",(0,a.jsx)(n.li,{children:"We don't use utility class (static method) or singleton here, should be using DI"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"public class SpellChecker{\n    private final Dictionary dict;\n    public SpellChecker(Dictinary dict){\n        this.dict = dicts;\n    }\n    // some public method\n}\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"DI help we work with many type of resources."}),"\n",(0,a.jsx)(n.li,{children:"pass resource by using method factory pattern with bounded wildcard type"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"Mosaic create(Supplier<? extends Tile> tileFactory){'...'};\n"})}),"\n",(0,a.jsx)(n.h3,{id:"avoid-creating-unnecessary-object",children:"Avoid creating unnecessary object"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"While String.matches is the easiest way to check if a string matches\na regular expression, it\u2019s not suitable for repeated use in performance-critical\nsituations"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:'static boolean isRomanNumeral(String s) {\n    return s.matches("^(?=.)M*(C[MD]|D?C{0,3})"\n    + "(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$");\n}\n'})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"increase performance way by create a Pattern instance."}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:'// Reusing expensive object for improved performance\npublic class RomanNumerals {\n    private static final Pattern ROMAN = Pattern.compile(\n        "^(?=.)M*(C[MD]|D?C{0,3})"\n        + "(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$");\n    static boolean isRomanNumeral(String s) {\n        return ROMAN.matcher(s).matches();\n    }\n}\n'})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Another example"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"// Hideously slow! Can you spot the object creation?\nprivate static long sum() {\n    Long sum = 0L;\n    for (long i = 0; i <= Integer.MAX_VALUE; i++)\n        sum += i;\n    \n    return sum;\n}\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"reduces the runtime from 6.3 seconds to 0.59 seconds on my machine."}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"prefer-try-with-resources-to-try-finally",children:"Prefer try-with-resources to try-finally."}),"\n",(0,a.jsx)(n.h2,{id:"chapter-3-methods-common-to-all-objects",children:"Chapter 3: Methods common to all objects"}),"\n",(0,a.jsx)(n.h3,{id:"obey-the-general-contract-when-overriding-equals",children:"Obey the general contract when overriding equals"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsx)(n.p,{children:"How to implement well-behaved equals() method."}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Reflexive: x.equals(x) is true"}),"\n",(0,a.jsxs)(n.li,{children:["Symmetric: x.equals(y) is true if and only if y.equals(x) is true","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Can be violated if check case sensitive of string (just cast the first String))","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"example: a vs A, A vs a."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["Transitive: x.equals(y) is true and y.equals(z) is true, then x.equals(z) is true","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"ColorPoint p1 = new ColorPoint(1, 2, Color.RED);"}),"\n",(0,a.jsx)(n.li,{children:"Point p2 = new Point(1, 2);"}),"\n",(0,a.jsx)(n.li,{children:"ColorPoint p3 = new ColorPoint(1, 2, Color.BLUE);"}),"\n",(0,a.jsx)(n.li,{children:"p1=p2, p2=p3 but p1!=p3."}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.li,{children:"Consistent: x.equals(y) returns the same result if called multiple times"}),"\n",(0,a.jsx)(n.li,{children:"For any non-null reference value x, x.equals(null) should return false"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsx)(n.p,{children:"\u201cFavor composition over inheritance.\u201d"}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.h4,{id:"the-recipe-for-a-high-quality-equals-method",children:"the recipe for a high-quality equals method:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"public final class PhoneNumber{\n    private final short areaCode, prefix, lineNum;\n    @Override public boolean equals(Object o){\n        // 1. Use the == operator to check if the argument is a reference to this object\n        if(o == this) return true;\n        // 2. Use the instanceof operator to check if the argument has the correct type\n        if(!(o instanceof PhoneNumber)) return false;\n        PhoneNumber pn = (PhoneNumber)o;\n        return pn.lineNum == lineNum && pn.prefix == prefix && pn.areaCode == areaCode;\n    }\n    \n}\n"})}),"\n",(0,a.jsx)(n.h3,{id:"always-override-hashcode-when-override-equals",children:"always override hashCode when override equals"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"How to implement well-behaved hashCode() method."}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"@Override public int hashCode() {\n    int result = Short.hashCode(areaCode);\n    result = 31 * result + Short.hashCode(prefix);\n    result = 31 * result + Short.hashCode(lineNum);\n    return result;\n}\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Can using library ",(0,a.jsx)(n.a,{href:"https://www.baeldung.com/introduction-to-autovalue",children:"https://www.baeldung.com/introduction-to-autovalue"})]}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"override-clone",children:"Override clone"}),"\n",(0,a.jsx)(n.h2,{id:"chapter-4-classes-and-interfaces",children:"chapter 4: Classes and Interfaces"}),"\n",(0,a.jsx)(n.h3,{id:"minimize-the-accessibility-of-classes-and-members",children:"Minimize the acce\\ssibility of classes and members"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"For top-level (non-nested) classes and interfaces, there are only two possible\naccess levels: package-private and public. If you declare a top-level class or\ninterface with the public modifier, it will be public; otherwise, it will be packageprivate. If a top-level class or interface can be made package-private, it should be.\nBy making it package-private, you make it part of the implementation rather than\nthe exported API, and you can modify it, replace it, or eliminate it in a subsequent\nrelease without fear of harming existing clients. If you make it public, you are\nobligated to support it forever to maintain compatibility"}),"\n",(0,a.jsx)(n.li,{children:"If a package-private top-level class or interface is used by only one class,\nconsider making the top-level class a private static nested class of the sole class\nthat uses it"}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"chapter-5",children:"Chapter 5:"}),"\n",(0,a.jsx)(n.h3,{id:"enum",children:"ENUM"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://github.com/marhan/effective-java-examples/blob/master/src/main/java/org/effectivejava/examples/chapter05/item27/GenericSingletonFactory.java",children:"https://github.com/marhan/effective-java-examples/blob/master/src/main/java/org/effectivejava/examples/chapter05/item27/GenericSingletonFactory.java"})}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:'public enum Operation {\n    PLUS("+") {\n        public double apply(double x, double y) {\n            return x + y;\n        }\n    };\n    private final String value;\n\n    Operation(String value) {\n        this.value = value;\n    }\n\n    public abstract double apply(double x, double y);\n\n    public String getValue() {\n        return value;\n    }\n}\n'})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Use lambda"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:'// Enum with function object fields & constant-specific behavior\npublic enum Operation {\n  PLUS ("+", (x, y) -> x + y),\n  MINUS ("-", (x, y) -> x - y),\n  TIMES ("*", (x, y) -> x * y),\n  DIVIDE("/", (x, y) -> x / y);\n  private final String symbol;\n  private final DoubleBinaryOperator op;\n  Operation(String symbol, DoubleBinaryOperator op) {\n    this.symbol = symbol;\n    this.op = op;\n  }\n  @Override public String toString() { return symbol; }\n  public double apply(double x, double y) {\n    return op.applyAsDouble(x, y);\n  }\n}\n'})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"test"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:'public static void main(String[] args) {\n\n  for(Operation op: Operation.values()) {\n    System.out.printf("%d %s %d =%f",1,op,2,op.apply(1, 2));\n  }\n}\n'})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Old way"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"// Enum that switches on its value to share code - questionable\nenum PayrollDay {\n  MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY,\n  SATURDAY, SUNDAY;\n  private static final int MINS_PER_SHIFT = 8 * 60;\n  int pay(int minutesWorked, int payRate) {\n    int basePay = minutesWorked * payRate;\n    int overtimePay;\n    switch(this) {\n      case SATURDAY: case SUNDAY: // Weekend\n        overtimePay = basePay / 2;\n        break;\n      default: // Weekday\n        overtimePay = minutesWorked <= MINS_PER_SHIFT ?\n                0 : (minutesWorked - MINS_PER_SHIFT) * payRate / 2;\n    }\n    return basePay + overtimePay;\n  }\n}\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"new way"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"// The strategy enum pattern\nenum PayrollDay {\n  MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY,\n  SATURDAY(PayType.WEEKEND), SUNDAY(PayType.WEEKEND);\n  private final PayType payType;\n  PayrollDay(PayType payType) { this.payType = payType; }\n  PayrollDay() { this(PayType.WEEKDAY); } // Default\n  int pay(int minutesWorked, int payRate) {\n    return payType.pay(minutesWorked, payRate);\n  }\n  // The strategy enum type\n  private enum PayType {\n    WEEKDAY {\n      int overtimePay(int minsWorked, int payRate) {\n        return minsWorked <= MINS_PER_SHIFT ? 0 :\n                (minsWorked - MINS_PER_SHIFT) * payRate / 2;\n      }\n    },\n    WEEKEND {\n      int overtimePay(int minsWorked, int payRate) {\n        return minsWorked * payRate / 2;\n      }\n    };\n    abstract int overtimePay(int mins, int payRate);\n    private static final int MINS_PER_SHIFT = 8 * 60;\n    int pay(int minsWorked, int payRate) {\n      int basePay = minsWorked * payRate;\n      return basePay + overtimePay(minsWorked, payRate);\n    }\n  }\n}\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"switch on an enum to simulate a missing method"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:'// Switch on an enum to simulate a missing method\npublic static Operation inverse(Operation op) {\n  switch(op) {\n    case PLUS: return Operation.MINUS;\n    case MINUS: return Operation.PLUS;\n    case TIMES: return Operation.DIVIDE;\n    case DIVIDE: return Operation.TIMES;\n    default: throw new AssertionError("Unknown op: " + op);\n  }\n}\n'})}),"\n",(0,a.jsx)(n.h3,{id:"enum-instead-of-bit-field",children:"Enum instead of bit field"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"// EnumSet - a modern replacement for bit fields\npublic class Text {\n  public enum Style { BOLD, ITALIC, UNDERLINE, STRIKETHROUGH }\n  // Any Set could be passed in, but EnumSet is clearly best\n  public void applyStyles(Set<Style> styles) {  }\n}\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"using"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"text.applyStyles(EnumSet.of(Style.BOLD, Style.ITALIC));\n"})}),"\n",(0,a.jsx)(n.h3,{id:"enummap",children:"EnumMap"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"fraught with danger and complexity"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:'// Using ordinal() to index into an array - DON\'T DO THIS!\nSet<Plant>[] plantsByLifeCycle =\n        (Set<Plant>[]) new Set[Plant.LifeCycle.values().length];\nfor (int i = 0; i < plantsByLifeCycle.length; i++)\nplantsByLifeCycle[i] = new HashSet<>();\n        for (Plant p : garden)\nplantsByLifeCycle[p.lifeCycle.ordinal()].add(p);\n// Print the results\nfor (int i = 0; i < plantsByLifeCycle.length; i++) {\n        System.out.printf("%s: %s%n",\n                          Plant.LifeCycle.values()[i], plantsByLifeCycle[i]);\n        }\n'})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"// Using an EnumMap to associate data with an enum\nMap<Plant.LifeCycle, Set<Plant>> plantsByLifeCycle =\n        new EnumMap<>(Plant.LifeCycle.class);\nfor (Plant.LifeCycle lc : Plant.LifeCycle.values())\n        plantsByLifeCycle.put(lc, new HashSet<>());\n        for (Plant p : garden)\n        plantsByLifeCycle.get(p.lifeCycle).add(p);\nSystem.out.println(plantsByLifeCycle);\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"// Using a stream and an EnumMap to associate data with an enum\nSystem.out.println(Arrays.stream(garden)\n.collect(groupingBy(p -> p.lifeCycle,\n() -> new EnumMap<>(LifeCycle.class), toSet())));\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Using a nested EnumMap to associate data with enum pairs"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"public enum Phase {\n  SOLID, LIQUID, GAS;\n  public enum Transition {\n    MELT(SOLID, LIQUID), FREEZE(LIQUID, SOLID),\n    BOIL(LIQUID, GAS), CONDENSE(GAS, LIQUID),\n    SUBLIME(SOLID, GAS), DEPOSIT(GAS, SOLID);\n    private final Phase from;\n    private final Phase to;\n    Transition(Phase from, Phase to) {\n      this.from = from;\n      this.to = to;\n    }\n    // Initialize the phase transition map\n    private static final Map<Phase, Map<Phase, Transition>>\n            m = Stream.of(values()).collect(groupingBy(t -> t.from,\n            () -> new EnumMap<>(Phase.class),\n            toMap(t -> t.to, t -> t,\n                    (x, y) -> y, () -> new EnumMap<>(Phase.class))));\n    public static Transition from(Phase from, Phase to) {\n      return m.get(from).get(to);\n    }\n  }\n}\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Adding new type"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"// Adding a new phase using the nested EnumMap implementation\npublic enum Phase {\n  SOLID, LIQUID, GAS, PLASMA;\n  public enum Transition {\n    MELT(SOLID, LIQUID), FREEZE(LIQUID, SOLID),\n    BOIL(LIQUID, GAS), CONDENSE(GAS, LIQUID),\n    SUBLIME(SOLID, GAS), DEPOSIT(GAS, SOLID),\n    IONIZE(GAS, PLASMA), DEIONIZE(PLASMA, GAS);\n     // Remainder unchanged\n  }\n}\n"})}),"\n",(0,a.jsx)(n.h3,{id:"annotations",children:"Annotations"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://github.com/marhan/effective-java-examples/blob/master/src/main/java/org/effectivejava/examples/chapter06/item35/RunTests.java",children:"https://github.com/marhan/effective-java-examples/blob/master/src/main/java/org/effectivejava/examples/chapter06/item35/RunTests.java"})}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"chapter-7-lambdas-and-streams",children:"Chapter 7: Lambdas and Streams"}),"\n",(0,a.jsx)(n.h3,{id:"prefer-lambdas-to-anonymous-classes",children:"Prefer lambdas to anonymous classes"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Obsolate"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"// Anonymous class instance as a function object - obsolete!\nCollections.sort(words, new Comparator<String>() {\n  public int compare(String s1, String s2) {\n    return Integer.compare(s1.length(), s2.length());\n  }\n});\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"become"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"// Lambda expression as function object (replaces anonymous class)\nCollections.sort(words,(s1, s2) -> Integer.compare(s1.length(), s2.length()));\n"})}),"\n",(0,a.jsx)(n.h3,{id:"favor-the-use-of-standard-functional-interfaces",children:"Favor the use of standard functional interfaces"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"UnaryOperator<T> T apply(T t) String::toLowerCase\nBinaryOperator<T> T apply(T t1, T t2) BigInteger::add\nPredicate<T> boolean test(T t) Collection::isEmpty\nFunction<T,R> R apply(T t) Arrays::asList\nSupplier<T> T get() Instant::now\nConsumer<T> void accept(T t) System.out::println\n"})}),"\n",(0,a.jsx)(n.h3,{id:"use-caution-when-making-stream-parallel",children:"Use caution when making stream parallel"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsx)(n.p,{children:"Don't parallelize stream when stream has Stream.iterate(), limit()."}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"stream need to care about race condition."}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsx)(n.p,{children:"terminal operation"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"count, collect, forEach."}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsx)(n.p,{children:"Stateless operation"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"map, filter"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsx)(n.p,{children:"Bounded operation (keep constant varialbe)"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"sum, max, reduce, skip, limit."}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsx)(n.p,{children:"statefull operation (Unbounded operation, is it ?)"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["sort (because it need to keep all element in memory), distinct.","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"example, reverse prime number need know the largest prime number, in mathematic, we don't know."}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"chapter-8--methods",children:"CHapter 8 : Methods"}),"\n",(0,a.jsx)(n.h3,{id:"use-overloading-judiciously",children:"Use overloading judiciously"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:'// Broken! - What does this program print?\npublic class CollectionClassifier {\n    public static String classify(Set<?> s) {\n        return "Set";\n    }\n\n    public static String classify(List<?> lst) {\n        return "List";\n    }\n\n    public static String classify(Collection<?> c) {\n        return "Unknown Collection";\n    }\n\n    public static void main(String[] args) {\n        Collection<?>[] collections = {\n                new HashSet<String>(),\n                new ArrayList<BigInteger>(),\n                new HashMap<String, String>().values()\n        };\n        for (Collection<?> c : collections)\n            System.out.println(classify(c));\n    }\n}\n'})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Override"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:'public class overLoading {\n  static class Wine {\n    String name() { return "wine"; }\n  }\n  static class SparklingWine extends Wine {\n    @Override String name() { return "sparkling wine"; }\n  }\n  static class Champagne extends SparklingWine {\n    @Override String name() { return "champagne"; }\n  }\n  public static void main(String[] args) {\n    List<Wine> wineList = List.of(\n            new Wine(), new SparklingWine(), new Champagne());\n    for (Wine wine : wineList)\n      System.out.println(wine.name());\n  }\n}\n'})}),"\n",(0,a.jsx)(n.h3,{id:"use-optional-judiciously",children:"use optional judiciously"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://blogs.oracle.com/javamagazine/post/12-recipes-for-using-the-optional-class-as-its-meant-to-be-used",children:"https://blogs.oracle.com/javamagazine/post/12-recipes-for-using-the-optional-class-as-its-meant-to-be-used"})}),"\n",(0,a.jsx)(n.li,{children:"bad"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:'Optional<ProcessHandle> parentProcess = ph.parent();\nSystem.out.println("Parent PID: " + (parentProcess.isPresent() ?\n String.valueOf(parentProcess.get().pid()) : "N/A"));\n'})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"good"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:'System.out.println("Parent PID: " +\nph.parent().map(h -> String.valueOf(h.pid())).orElse("N/A"));\n'})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"bad"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"public Insurance findCheapestInsurance(Person person, Car car) {\n  // queries services provided by the different insurance companies\n  // compare all those data\n  return cheapestCompany;\n}\npublic Optional<Insurance> nullSafeFindCheapestInsurance(\n        Optional<Person> person, Optional<Car> car) {\n  if (person.isPresent() && car.isPresent()) {\n    return Optional.of(findCheapestInsurance(person.get(), car.get()));\n  } else {\n    return Optional.empty();\n  }\n}\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"good"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"public Optional<Insurance> nullSafeFindCheapestInsurance(\n                              Optional<Person> person, Optional<Car> car) {\n    return person.flatMap(p -> car.map(c -> findCheapestInsurance(p, c)));\n}\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Bad"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:'Insurance insurance = ...;\n        if(insurance != null && "CambridgeInsurance".equals(insurance.getName())){\n        System.out.println("ok");\n}\n'})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"good"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:'Optional<Insurance> optInsurance = ...;\noptInsurance.filter(insurance -> "CambridgeInsurance".equals(insurance.getName()))\n    .ifPresent(x -> System.out.println("ok"));\n'})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Example 1: a chain of Optional, instead of check null."}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:'public String getCarInsuranceName(Optional<Person> person, int minAge) {\n  return person.filter(p -> p.getAge() >= minAge)\n          .flatMap(Person::getCar)\n          .flatMap(Car::getInsurance)\n          .map(Insurance::getName)\n          .orElse("Unknown");\n}\n'})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Example 2: Should write a utility class to hold in thing like below"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"public static Optional<Integer> stringToInt(String s){\n    try{\n        return Optional.of(Integer.parseInt(s));\n    }catch(NumberFormatException e){\n        return Optional.empty();\n    }\n}\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Example 3:"}),"\n",(0,a.jsx)(n.li,{children:"bad"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"public int readDuration(Properties props, String name) {\n  String value = props.getProperty(name);\n  if (value != null) {\n    try {\n      int i = Integer.parseInt(value);\n      if (i > 0) {\n        return i;\n      }\n    } catch (NumberFormatException nfe) { }\n  }\n  return 0;\n}\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"good"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"public int readDuration(Properties props, String name) {\n  return Optional.ofNullable(props.getProperty(name))\n          .flatMap(Utility::stringToInt)\n          .filter(i->i>0)\n          .orElse(0);\n}\n"})}),"\n",(0,a.jsx)(n.h3,{id:"write-documents",children:"Write documents"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-java",children:"/**\n* Returns the element at the specified position in this list.\n*\n* <p>This method is <i>not</i> guaranteed to run in constant\n* time. In some implementations it may run in time proportional\n* to the element position.\n*\n* @param index index of element to return; must be\n* non-negative and less than the size of this list\n* @return the element at the specified position in this list\n* @throws IndexOutOfBoundsException if the index is out of range\n* ({@code index < 0 || index >= this.size()})\n*/\nE get(int index);\n"})})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>l,a:()=>r});var a=i(7294);const t={},s=a.createContext(t);function r(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);