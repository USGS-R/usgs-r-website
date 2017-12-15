# convert R Training scheduled trainings from Google Sheets into JSON 
# in order to use on the OWI-R website

# run these lines to save the google token before running this 
  # token <- gs_auth(new_user=T)
  # saveRDS(token, file = 'googlesheets_token.rds')
  # token <- 'googlesheets_token.rds'

# To update the files: 
# 1. Set working directory to usgs-r-website, ex. setwd("C:/Users/lcarr/usgs-r-website")
# 2. Run this script. 
# 3. In Git Bash, 
#       cd usgs-r-website
#       git fetch upstream
#       git merge upstream/master
#       git status -s
#       git add json/scheduledtrainings.json
#       git commit -m "MESSAGE"
#       git push

library(googlesheets)
library(dplyr)
library(jsonlite)

# browser will open requiring you to authenticate
gs_auth(new_user=TRUE)

# pull in the correct google sheet
sheet_found <- gs_ls()

# register the spreadsheet by title (must occur in order to read it in)
sheet_registered <- gs_title("Scheduled Trainings")

# read in the data
data <- gs_read(sheet_registered, ws="Course_Schedule")

# only return officially scheduled trainings
data_website <- data %>% 
  filter(Schedule_Status == "Scheduled") %>%
  mutate(Start = as.Date(Start, "%m/%d/%Y")) %>% 
  mutate(End = as.Date(End, "%m/%d/%Y")) %>% 
  arrange(Start) %>% 
  select(-Position_num, -Schedule_Status, -Total_Attendees)
  
export_json <- toJSON(data_website)
write(export_json, "json/scheduledtrainings.json")
