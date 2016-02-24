# convert R Training Post-Workshop responses from Google Sheets into JSON 
# in order to use on the OWI-R website

# To update the files: 
# 1. Run setwd("C:/Users/lcarr/usgs-r-website")
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
data_website <- data %>% 
  rename(satisfaction = Overall..how.satisfied.were.you.with.the.R.training.course.you.recently.attended., 
         feedback = Is.there.any.additional.feedback.you.would.like.the.instructors.of.the.course.to.receive..If.so..please.share.below.) %>% 
  select(satisfaction, feedback)

# filter only nice feedback
capitalize <- function(word){
  word_letters <- strsplit(word, "")[[1]]
  word_letters[1] <- LETTERS[which(letters == word_letters[1])]
  word_capital <- paste0(word_letters, collapse = "")
  return(word_capital)
}

feedback_wanted <- c("good", "excellent", "great", "wonderful")
add_caps <- sapply(feedback_wanted, capitalize)
feedback_wanted <- c(feedback_wanted, add_caps)
feedback_wanted <- paste(feedback_wanted, collapse="|")


data_website <- data_website %>% 
  filter(grepl(feedback_wanted, data_website$feedback))

export_json <- toJSON(data_website)
write(export_json, "json/postworkshop.json")
