# convert R Training scheduled trainings from Google Sheets into JSON 
# in order to use on the OWI-R website

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

# browser will open requiring you to authenticate (first time you run this)
sheet_found <- gs_ls()

# register the spreadsheet by title (must occur in order to read it in)
sheet_registered <- gs_title("Scheduled Trainings")

# read in the data
data <- gs_read(sheet_registered, ws="Course_Schedule")

# only return officially scheduled trainings
data_website <- data %>% 
  filter(!Schedule_Status %in% c("Tentative", "Complete")) %>%
  mutate(Start = as.Date(Start, "%m/%d/%Y")) %>% 
  mutate(End = as.Date(End, "%m/%d/%Y")) %>% 
  arrange(Start) %>% 
  select(-Schedule_Status, -Total_Attendees)
  
export_json <- toJSON(data_website)
write(export_json, "json/scheduledtrainings.json")
