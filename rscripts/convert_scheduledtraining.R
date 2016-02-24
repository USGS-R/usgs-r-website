# convert R Training scheduled trainings from Google Sheets into JSON 
# in order to use on the OWI-R website

# To update the files: 
# 1. Run setwd("C:/Users/lcarr/usgs-r-website")
# 2. Run this script. 
# 3. 

library(googlesheets)
library(dplyr)
library(jsonlite)

# browser will open requiring you to authenticate (first time you run this)
sheet_found <- gs_ls()

# register the spreadsheet by title (must occur in order to read it in)
sheet_registered <- gs_title("Scheduled Trainings")

# read in the data
data <- gs_read(sheet_registered)

# only return officially scheduled trainings
data_website <- data %>% 
  filter(!Schedule.Status %in% c("Tentative", "Complete")) %>%
  mutate(Start = as.Date(Start, "%m/%d/%Y")) %>% 
  mutate(End = as.Date(End, "%m/%d/%Y")) %>% 
  arrange(Start) %>% 
  select(-Schedule.Status, -Total.Attendees)
  
export_json <- toJSON(data_website)
write(export_json, "json/scheduledtrainings.json")

# now update the scheduledtrainings.json file on the repo with this one
