# Work Prep

### Questions I would expect to ask
 - What happens with a duplicate user/email? Are there any checks for this?
 - For the phone number input, are we only checking for US based numbers or can they be from other countries?
 - For the phone number input, are we looking for a value with these:  () - , - -, + () -, + - -, etc ? Like is there a specific combo that we are allowing?
 - What would an invalid name look like? Would it just not have a space in it?
 - is there a back button planned so the user can go back and modify their selection?
 - How about validation messages for missing passwords, incorrectly formatted numbers, etc. ? I only see a mention about validation messages for email and nothing else
 - Testing with other languages?


### Anything Missing
 - Anything about duplicate users
 - data-testids? Is there a ticket that would be linked to this about adding test ids?

### Story Points
It really depends on what the status of the automated testing framework looks like. In this case I am going to assume that playwright was used and that the basic structure with automation is already set up, and in this case I would give it, on a scale of 1 to 21, around a 6. This is because I would need to either create or modify existing page object models, create a saving mechanism for logging into the user that was created, and adding testids if there aren't any added at the moment. 

### Is the story ready to be accepted for automated work
<br>
I would say it would not be ready. It needs more information about validators and more information about the phone number input. If these were to fail, should I expect some kind of error from the API? Also I would think that, knowing that this ticket is talking about a whole new feature, that there would be one main ticket describing what the flow should look like with design diagrams, and tasks assigned to it for each page of the document. That way, each part of the flow could be assigned to a developer or the progress could be monitored. 
