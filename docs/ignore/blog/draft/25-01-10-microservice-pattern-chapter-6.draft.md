# Microservice Pattern with example in Java part 6

This page talks about lessons learned from the book <span className="layered-style">"Microservice
Patterns with example in Java"</span> by Chris Richardson, so sentences are my own thoughts, not
from the book.
<!--   style="color: #FF6F61;" -->

## Chapter 6: Developing business logic with event sourcing

### 6.1 Developing business logic using event sourcing 

Event sourcing is a different way of structuring the business logic and persisting aggregates. It persists an aggregate as a sequence of events. Each event represents a state
change of the aggregate. An application recreates the current state of an aggregate by
replaying the events.

Event sourcing also has drawbacks. It involves a learning curve, because it’s a different
way to write your business logic. Also, querying the event store is often difficult, which
requires you to use the CQRS pattern, described in chapter 7.

This approach clearly works well because most enterprise applications store data
this way. But it has several drawbacks and limitations:
-  Object-Relational impedance mismatch.
-  Lack of aggregate history.
-  Implementing audit logging is tedious and error prone.
-  Event publishing is bolted on to the business logic


<span className="layered-style">OBJECT-RELATIONAL IMPEDANCE MISMATCH </span>
- Object-Relational mapping is the Vietnam of Computer Science

<span className="layered-style">LACK OF AGGREGATE HISTORY </span>

Another limitation of traditional persistence is that it only stores the current state of
an aggregate. Once an aggregate has been updated, its previous state is lost. If an
application must preserve the history of an aggregate, perhaps for regulatory purposes, then developers must implement this mechanism themselves. It is time consuming to implement an aggregate history mechanism and involves duplicating code
that must be synchronized with the business logic.

<span className="layered-style">EVENT PUBLISHING IS BOLTED ON TO THE BUSINESS LOGIC </span>
Code traditional normally 
```java
updateDatabase();
// bolted on biz logic to determine publish kafka or not
```

Code with event-sourcing
```java
insertEventDatabase();
// publish message with kafka
```

#### 6.1.2 Overview of event sourcing

```java
Class aggregateClass = ...;
Aggregate aggregate = aggregateClass.newInstance();
for (Event event : events) {
aggregate = aggregate.applyEvent(event);
}
// use aggregate...
```


### 6.2 Implementing an event store 

... saga + event sourcing



















