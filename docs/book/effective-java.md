---
sidebar_position: 1
---

# Effective java

## Chapter 2: Creating and Destroying Objects
### Use static factory method instead of constructor
```java
public static Boolean valueOf(boolean b) {
    return b ? Boolean.TRUE : Boolean.FALSE;
}
```
- Naming: from, of, getInstance.
  - `Date d = Date.from(instant)`;
  - `Set<Rank> faceCards = EnumSet.of(JACK, QUEEN, KING)`;
  - `StackWalker luke = StackWalker.getInstance(options)`;
### Use builder when face with many constructor parameters
```java
// Builder Pattern
public class NutritionFacts {
    private final int servingSize;
    private final int carbohydrate;
    public static class Builder {
        // Required parameters
        private final int servingSize;
        private int carbohydrate = 0;
        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
        }
        public Builder carbohydrate(int val)
        { carbohydrate = val; return this; }
        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }
    private NutritionFacts(Builder builder) {
        servingSize = builder.servingSize;
        carbohydrate = builder.carbohydrate;
    }
}
```
```java
NutritionFacts cocaCola = new NutritionFacts.Builder(240)
    .carbohydrate(27).build();
```
- Hierarchies
```java
// Builder pattern for class hierarchies
public abstract class Pizza {
    public enum Topping { HAM, MUSHROOM, ONION, PEPPER, SAUSAGE }
    final Set<Topping> toppings;
    abstract static class Builder<T extends Builder<T>> {
        EnumSet<Topping> toppings = EnumSet.noneOf(Topping.class);
        public T addTopping(Topping topping) {
            toppings.add(Objects.requireNonNull(topping));
            return self();
        }
        abstract Pizza build();
        // Subclasses must override this method to return "this"
        protected abstract T self();
    }
    Pizza(Builder<?> builder) {
        toppings = builder.toppings.clone(); // See Item 50
    }
}
```
```java
public class NyPizza extends Pizza {
    public enum Size { SMALL, MEDIUM, LARGE }
    private final Size size;
    public static class Builder extends Pizza.Builder<Builder> {
        private final Size size;
        public Builder(Size size) {
        this.size = Objects.requireNonNull(size);
        }
        @Override public NyPizza build() {
        return new NyPizza(this);
        }
        @Override protected Builder self() { return this; }
    }
    private NyPizza(Builder builder) {
        super(builder);
        size = builder.size;
    }
}
```
```java
NyPizza pizza = new NyPizza.Builder(SMALL)
.addTopping(SAUSAGE).addTopping(ONION).build();
```
### DI to hardwiring resources
- example with spellchecker + dictionary:
  - spellchecker for each language need its own dictionary
  - We don't use utility class (static method) or singleton here, should be using DI
```java
public class SpellChecker{
    private final Dictionary dict;
    public SpellChecker(Dictinary dict){
        this.dict = dicts;
    }
    // some public method
}
```
- DI help we work with many type of resources.
- pass resource by using method factory pattern with bounded wildcard type 
```java
Mosaic create(Supplier<? extends Tile> tileFactory){'...'};
```
### Avoid creating unnecessary object
- While String.matches is the easiest way to check if a string matches
  a regular expression, it’s not suitable for repeated use in performance-critical
  situations
```java
static boolean isRomanNumeral(String s) {
    return s.matches("^(?=.)M*(C[MD]|D?C{0,3})"
    + "(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$");
}
```
- increase performance way by create a Pattern instance.
```java
// Reusing expensive object for improved performance
public class RomanNumerals {
    private static final Pattern ROMAN = Pattern.compile(
        "^(?=.)M*(C[MD]|D?C{0,3})"
        + "(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$");
    static boolean isRomanNumeral(String s) {
        return ROMAN.matcher(s).matches();
    }
}
```
- Another example
```java
// Hideously slow! Can you spot the object creation?
private static long sum() {
    Long sum = 0L;
    for (long i = 0; i <= Integer.MAX_VALUE; i++)
        sum += i;
    
    return sum;
}
```
- reduces the runtime from 6.3 seconds to 0.59 seconds on my machine.

### Prefer try-with-resources to try-finally.

## Chapter 3: Methods common to all objects

### Obey the general contract when overriding equals
- How to implement well-behaved equals() method.
  - Reflexive: x.equals(x) is true
  - Symmetric: x.equals(y) is true if and only if y.equals(x) is true
    - Can be violated if check case sensitive of string (just cast the first String))
      - example: a vs A, A vs a.
  - Transitive: x.equals(y) is true and y.equals(z) is true, then x.equals(z) is true
    - ColorPoint p1 = new ColorPoint(1, 2, Color.RED);
    - Point p2 = new Point(1, 2);
    - ColorPoint p3 = new ColorPoint(1, 2, Color.BLUE);
    - p1=p2, p2=p3 but p1!=p3.
  - Consistent: x.equals(y) returns the same result if called multiple times
  - For any non-null reference value x, x.equals(null) should return false

- “Favor composition over inheritance.”

#### the recipe for a high-quality equals method:
```java
public final class PhoneNumber{
    private final short areaCode, prefix, lineNum;
    @Override public boolean equals(Object o){
        // 1. Use the == operator to check if the argument is a reference to this object
        if(o == this) return true;
        // 2. Use the instanceof operator to check if the argument has the correct type
        if(!(o instanceof PhoneNumber)) return false;
        PhoneNumber pn = (PhoneNumber)o;
        return pn.lineNum == lineNum && pn.prefix == prefix && pn.areaCode == areaCode;
    }
    
}
```

### always override hashCode when override equals
- How to implement well-behaved hashCode() method.
```java
@Override public int hashCode() {
    int result = Short.hashCode(areaCode);
    result = 31 * result + Short.hashCode(prefix);
    result = 31 * result + Short.hashCode(lineNum);
    return result;
}
```
- Can using library https://www.baeldung.com/introduction-to-autovalue

### Override clone


## chapter 4: Classes and Interfaces
### Minimize the acce\ssibility of classes and members
- For top-level (non-nested) classes and interfaces, there are only two possible
  access levels: package-private and public. If you declare a top-level class or
  interface with the public modifier, it will be public; otherwise, it will be packageprivate. If a top-level class or interface can be made package-private, it should be.
  By making it package-private, you make it part of the implementation rather than
  the exported API, and you can modify it, replace it, or eliminate it in a subsequent
  release without fear of harming existing clients. If you make it public, you are
  obligated to support it forever to maintain compatibility
- If a package-private top-level class or interface is used by only one class,
  consider making the top-level class a private static nested class of the sole class
  that uses it 

## Chapter 5:
### ENUM
- https://github.com/marhan/effective-java-examples/blob/master/src/main/java/org/effectivejava/examples/chapter05/item27/GenericSingletonFactory.java
```java
public enum Operation {
    PLUS("+") {
        public double apply(double x, double y) {
            return x + y;
        }
    };
    private final String value;

    Operation(String value) {
        this.value = value;
    }

    public abstract double apply(double x, double y);

    public String getValue() {
        return value;
    }
}
```
```java
public static void main(String[] args) {

  for(Operation op: Operation.values()) {
    System.out.printf("%d %s %d =%f",1,op,2,op.apply(1, 2));
  }
}
```
- Old way
```java
// Enum that switches on its value to share code - questionable
enum PayrollDay {
  MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY,
  SATURDAY, SUNDAY;
  private static final int MINS_PER_SHIFT = 8 * 60;
  int pay(int minutesWorked, int payRate) {
    int basePay = minutesWorked * payRate;
    int overtimePay;
    switch(this) {
      case SATURDAY: case SUNDAY: // Weekend
        overtimePay = basePay / 2;
        break;
      default: // Weekday
        overtimePay = minutesWorked <= MINS_PER_SHIFT ?
                0 : (minutesWorked - MINS_PER_SHIFT) * payRate / 2;
    }
    return basePay + overtimePay;
  }
}
```
- new way
```java
// The strategy enum pattern
enum PayrollDay {
  MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY,
  SATURDAY(PayType.WEEKEND), SUNDAY(PayType.WEEKEND);
  private final PayType payType;
  PayrollDay(PayType payType) { this.payType = payType; }
  PayrollDay() { this(PayType.WEEKDAY); } // Default
  int pay(int minutesWorked, int payRate) {
    return payType.pay(minutesWorked, payRate);
  }
  // The strategy enum type
  private enum PayType {
    WEEKDAY {
      int overtimePay(int minsWorked, int payRate) {
        return minsWorked <= MINS_PER_SHIFT ? 0 :
                (minsWorked - MINS_PER_SHIFT) * payRate / 2;
      }
    },
    WEEKEND {
      int overtimePay(int minsWorked, int payRate) {
        return minsWorked * payRate / 2;
      }
    };
    abstract int overtimePay(int mins, int payRate);
    private static final int MINS_PER_SHIFT = 8 * 60;
    int pay(int minsWorked, int payRate) {
      int basePay = minsWorked * payRate;
      return basePay + overtimePay(minsWorked, payRate);
    }
  }
}
```
- switch on an enum to simulate a missing method
```java
// Switch on an enum to simulate a missing method
public static Operation inverse(Operation op) {
  switch(op) {
    case PLUS: return Operation.MINUS;
    case MINUS: return Operation.PLUS;
    case TIMES: return Operation.DIVIDE;
    case DIVIDE: return Operation.TIMES;
    default: throw new AssertionError("Unknown op: " + op);
  }
}
```
### Enum instead of bit field
```java
// EnumSet - a modern replacement for bit fields
public class Text {
  public enum Style { BOLD, ITALIC, UNDERLINE, STRIKETHROUGH }
  // Any Set could be passed in, but EnumSet is clearly best
  public void applyStyles(Set<Style> styles) {  }
}
```
- using
```
text.applyStyles(EnumSet.of(Style.BOLD, Style.ITALIC));
```
### EnumMap
- fraught with danger and complexity
```
// Using ordinal() to index into an array - DON'T DO THIS!
Set<Plant>[] plantsByLifeCycle =
        (Set<Plant>[]) new Set[Plant.LifeCycle.values().length];
for (int i = 0; i < plantsByLifeCycle.length; i++)
plantsByLifeCycle[i] = new HashSet<>();
        for (Plant p : garden)
plantsByLifeCycle[p.lifeCycle.ordinal()].add(p);
// Print the results
for (int i = 0; i < plantsByLifeCycle.length; i++) {
        System.out.printf("%s: %s%n",
                          Plant.LifeCycle.values()[i], plantsByLifeCycle[i]);
        }
```

```
// Using an EnumMap to associate data with an enum
Map<Plant.LifeCycle, Set<Plant>> plantsByLifeCycle =
        new EnumMap<>(Plant.LifeCycle.class);
for (Plant.LifeCycle lc : Plant.LifeCycle.values())
        plantsByLifeCycle.put(lc, new HashSet<>());
        for (Plant p : garden)
        plantsByLifeCycle.get(p.lifeCycle).add(p);
System.out.println(plantsByLifeCycle);
```

```
// Using a stream and an EnumMap to associate data with an enum
System.out.println(Arrays.stream(garden)
.collect(groupingBy(p -> p.lifeCycle,
() -> new EnumMap<>(LifeCycle.class), toSet())));
```

- Using a nested EnumMap to associate data with enum pairs
```java
public enum Phase {
  SOLID, LIQUID, GAS;
  public enum Transition {
    MELT(SOLID, LIQUID), FREEZE(LIQUID, SOLID),
    BOIL(LIQUID, GAS), CONDENSE(GAS, LIQUID),
    SUBLIME(SOLID, GAS), DEPOSIT(GAS, SOLID);
    private final Phase from;
    private final Phase to;
    Transition(Phase from, Phase to) {
      this.from = from;
      this.to = to;
    }
    // Initialize the phase transition map
    private static final Map<Phase, Map<Phase, Transition>>
            m = Stream.of(values()).collect(groupingBy(t -> t.from,
            () -> new EnumMap<>(Phase.class),
            toMap(t -> t.to, t -> t,
                    (x, y) -> y, () -> new EnumMap<>(Phase.class))));
    public static Transition from(Phase from, Phase to) {
      return m.get(from).get(to);
    }
  }
}
```
- Adding new type
```java
// Adding a new phase using the nested EnumMap implementation
public enum Phase {
  SOLID, LIQUID, GAS, PLASMA;
  public enum Transition {
    MELT(SOLID, LIQUID), FREEZE(LIQUID, SOLID),
    BOIL(LIQUID, GAS), CONDENSE(GAS, LIQUID),
    SUBLIME(SOLID, GAS), DEPOSIT(GAS, SOLID),
    IONIZE(GAS, PLASMA), DEIONIZE(PLASMA, GAS);
     // Remainder unchanged
  }
}
```


### Optional
- https://blogs.oracle.com/javamagazine/post/12-recipes-for-using-the-optional-class-as-its-meant-to-be-used