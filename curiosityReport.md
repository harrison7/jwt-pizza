# Curiosity Report: SRE

Site Reliability Engineering is a philosophy originating from Google, similar to DevOps. It pioneered many of the concepts talked about early on in this class, such as a focus on reducing toil and increasing automation as much as possible. It also includes pursuing only as much reliability as necessary, bias toward risk reduction, and observability.

## Toil

Toil means manual, repetitive tasks. The top three kinds of toil as report by Google SRE's are:
1. Interrupts (non-urgent service-related messages and emails)
2. On-call (urgent) responses
3. Releases and pushes

An article on Google's SRE website recounts a case of solving excessive toil in Bigtable, a data system. There were so many incidents and customer requests, that they began to occupy the majority of the team's time, dominating their time for projects and other progressive work. The SRE team had a meeting and decided that they needed a permanent solution, by prioritizing less customer requests and focusing more on automation, creating basic tools first which helped paved the way for advanced automation. This ended up snowballing, with each toil reduction creating more time to reduce even more toil. There was so much improvement that customer requests decreased from 2200 to 400 per quarter.

## Implementation types

Google's SRE website had several different recommendations for how to implement a SRE team in a company:

- **Kitchen Sink:** Often the first implementation of a SRE team, this is a team with more undefined boundaries and performs odd jobs to generally improve the reliability of a service.
- **Infrastructure and Tools:** A SRE team focused on improving internal features for the other developers in a service
- **Product/application:** A team specifically focused on one app, best if there are a limited amount in the company to prevent duplication/redundancy
- **Embedded:** Instead of a separate team, a few SR engineers are directly integrated into the developing team. This is useful to improve collaboration and communication.
- **Consulting:** More hands-off, the team suggests solutions and can code ideas, but they do not have the final say.

## Why Heroism is Bad

Google had a very interesting article about the problems of "heroism" in SRE. It described a hero as someone who would devote themselves at all costs to reach a certain objective. This can be a problem if they are putting in more toil to fix something that is actually the result of a flawed system that needs automation. Some examples include having a faster launch process, or certain SLO's for performance or service. If a "hero" continues to put in way too much toil, no one will know that the system is broken, nor that the set SLO's are unreasonable. This will soon lead to burnout as well. Google's article encourages ending "heroism" and letting the service break, so that everyone would be on board with fixing the flaw in the system and improving automation.

I was pretty surprised by this viewpoint, since one of my personal philosophies is that an individual effort can be stronger than letting the system handle everything. However this mindset makes a lot of sense in the context of software development, especially since it is a field with so much potential for automation. 

## Capacity Management

It is very important to make sure a service can reliably stay online without issue. One specific principle is redundancy: A level of N+0 means the system functions, but an outage will cause it to go down. N+1 means it can function with a single region going down, and N+2 means it can function when two regions go down. An ideal goal is to function at N+2, so that maintenance can be done in one region and an unplanned outage can happen at the same time, but the service will remain online. However, it is more cost efficient to have more replicas if you are on N+2; it is a large investment to make.

## Multi-single-tenant architectures in cloud

A collaboratory article hosted on O'Reilly used an analogy where birds would represent an instance of a system. They used it to explain how to best set up a cloud-based service. In one joking example, they presented a funny-looking bird that would cater to the exact needs of a single user, but there could only be a single bird. This represented a single-tenant system. Another example was a multitenant system, where there is a flock of birds to handle user requests, and if one instance goes down, you can easily kill it off and replace it with an identical bird. The third and final example is a multi-single-tenant system, which has the greatest potential but is the most difficult to implement. It is like having a zoo of unique and exotic birds, having many that can cater to the exact needs of a user. Each type of tenant will need unique care to make it work, and you can't kill them like in a regular multitenant system since each type of tenant is vital. However, it is possible to automate the management of the tenants, through methods such as grouping them together into classes, and creating multitenants that manage a group of single tenant instances (like a mother bird caring for her nest). While this method requires the most initial investment, it will pay off by having the fewest outages and most automation by the end.
