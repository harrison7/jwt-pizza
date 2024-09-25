# Curiosity Report: SRE

Site Reliability Engineering is a philosophy originating from Google, similar to DevOps. It pioneered many of the concepts talked about early on in this class, such as a focus on reducing toil and increasing automation as much as possible. It also includes pursuing only as much reliability as necessary, bias toward risk reduction, and observability.

## Toil

Toil means manual, repetitive tasks. The top three kinds of toil as report by Google SRE's are:
1. Interrupts (non-urgent service-related messages and emails)
2. On-call (urgent) responses
3. Releases and pushes

An article on Google's SRE website recounts a case of solving excessive toil in Bigtable, a data system. There were so many incidents and customer requests, that they began to occupy the majority of the team's time, dominating their time for projects and other progressive work. The SRE team had a meeting and decided that they needed a permanent solution, by prioritizing less customer requests and focusing more on automation, creating basic tools first which helped paved the way for advanced automation. This ended up snowballing, with each toil reduction creating more time to reduce even more toil. There was so much improvement that customer requests decreased from 2200 to 400 per quarter.

## Implementation types

### Kitchen Sink

Often the first implementation of a SRE team, 

## Why Heroism is Bad
Google had a very interesting article about the problems of "heroism" in SRE. It was described a hero as someone who would devote themselves at all costs to reach a certain objective. This can be a problem if they are putting in more toil to fix something that is actually the result of a broken system. Some examples include having a faster launch process, or certain SLO's for performance or service. If a "hero" continues to put in way too much toil, no one will know that the system is broken, nor that the set SLO's are unreasonable. This will soon lead to burnout as well. Google's article encourage ending "heroism" and letting the service break, so that everyone would be on board with fixing the flaw in the system and improving automation.

