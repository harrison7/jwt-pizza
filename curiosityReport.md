# Curiosity Report: SRE

Site Reliability Engineering is a philosophy originating from Google, similar to DevOps. It pioneered many of the concepts talked about early on in this class, such as a focus on reducing toil and increasing automation as much as possible. It also includes pursuing only as much reliability as necessary, bias toward risk reduction, and observability.

## Why Heroism is Bad
Google had a very interesting article about the problems of "heroism" in SRE. It was described a hero as someone who would devote themselves at all costs to reach a certain objective. This can be a problem if they are putting in more toil to fix something that is actually the result of a broken system. Some examples include having a faster launch process, or certain SLO's for performance or service. If a "hero" continues to put in way too much toil, no one will know that the system is broken, nor that the set SLO's are unreasonable. This will soon lead to burnout as well. Google's article encourage ending "heroism" and letting the service break, so that everyone would be on board with fixing the flaw in the system and improving automation.


