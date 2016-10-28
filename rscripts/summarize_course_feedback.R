# create summary of google survey results for a specific course

whichTraining <- "LMGWSC, Nashville, TN (10/11/2016 thru 10/13/2016)"
output <- 'html'
path <- 'C:/Users/lcarr/usgs-r-website/rscripts'

createCourseSummary <- function(whichTraining, output, path, isPre=TRUE, isPost=TRUE){
  library(googlesheets)
  library(rmarkdown)
  
  # browser will open requiring you to authenticate (first time you run this)
  gs_auth(new_user=TRUE)
  
  # list sheets found
  sheet_found <- gs_ls()
  
  #\\#\\# pre-assessment #\\#\\#
  # register the spreadsheet by title (must occur in order to read it in)
  sheet_registered_pre <- gs_title("R Pre-Workshop Assessment (Responses)")
  # read in the data
  preData <- gs_read(sheet_registered_pre)
  
  #\\#\\# post-assessment #\\#\\#
  # register the spreadsheet by title (must occur in order to read it in)
  sheet_registered_post <- gs_title("R Post-Workshop Assessment (Responses)")
  # read in the data
  postData <- gs_read(sheet_registered_post)
  
  rmd_file <- file.path(path, "summarize_course_feedback.Rmd")
  
  out_file <- render(input = rmd_file, 
                     output_format = paste0(output,"_document"), 
                     params = list(whichTraining = whichTraining,
                                   preData = preData,
                                   postData = postData),
                     output_dir = path)
  return(out_file)
}

# just pre:
# createCourseSummary(whichTraining, output, path, isPost=FALSE)

# just post:
# createCourseSummary(whichTraining, output, path, isPre=FALSE)

# both
createCourseSummary(whichTraining, output, path)
