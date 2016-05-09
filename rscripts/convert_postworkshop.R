# convert R Training Post-Workshop responses from Google Sheets into JSON 
# in order to use on the OWI-R website

# To update the files: 
# 1. Set working directory to usgs-r-website, ex. setwd("C:/Users/lcarr/usgs-r-website")
# 2. Run this script. 
# 3. In Git Bash, 
#       cd usgs-r-website
#       git status -s
#       git add json/postworkshop.json
#       git commit -m "MESSAGE"

library(googlesheets)
library(dplyr)
library(jsonlite)

# browser will open requiring you to authenticate
# pull in the correct google sheet
sheet_found <- gs_ls("Post-Workshop")

# register the spreadsheet by title (must occur in order to read it in)
sheet_registered <- gs_title("R Post-Workshop Assessment (Responses)")

# read in the data
data <- gs_read(sheet_registered)

# pull out the columns needed
data_feedback <- data %>%
  filter(`Appropriate for website?` == "Yes") %>% 
  rename(satisfaction = `Overall, how satisfied were you with the R training course you recently attended?`, 
         feedback = `Is there any additional feedback you would like the instructors of the course to receive? If so, please share below.`) %>% 
  select(satisfaction, feedback) %>% 
  filter(nchar(feedback) <= 350) %>% 
  na.omit() 

##\\## not enough bad data for even distribution, need to change later

data_good <- data_feedback %>% 
  filter(satisfaction >= 4) %>% 
  sample_n(8)

data_eh <- data_feedback %>% 
  filter(satisfaction < 4) %>% 
  sample_n(1)  

data_website <- rbind(data_good, data_eh) %>% 
  sample_n(9)
  
export_json <- toJSON(data_website)
write(export_json, "json/postworkshop.json")
