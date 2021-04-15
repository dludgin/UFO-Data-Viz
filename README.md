# a4-mapyourbreath (New Team Name: Are we alone?)

DESIGN RATIONALE

Overview

For A4, we chose a dataset from the National UFO Reporting Center that contains over 80,000 reports of UFO sightings over the past century. This dataset was scraped, geolocated, and time standardized by Sigmond Axel. For each sighting, the data contains city, state, time, high-level & detailed descriptions, observed shape, and duration. We thought it would be fascinating to see the UFO stories that may have occurred in our hometowns.

Through exploring the dataset, we developed a series of questions. Are there double sightings? What areas of the country are most likely to have UFO sightings? Are there any trends in UFO sightings over time? Do sightings tend to be seasonal or cluster around certain points of interest? What are the most common UFO descriptions? 

We used these questions to think through what a user may wish to see in an Interactive Data Visualization built off this dataset and realized that the most interesting parts of the data are the hilarious, strange, and unusual stories found at the end of a discovery process. With this insight in mind, we focused on designing a data visualization that would assist the user’s exploration and help them filter down the thousands of UFO sightings to a meaningful set of stories with personal relevance. Our goal is to help users explore this dataset to learn about the variety and frequency of sightings that have occurred across the country and in their own backyard.

Visualization Design

For our visualization, we designed for the user’s journey in 3 sequential layers.

Layer 1 is driven by geographical data. In order to fully grasp the breadth of the UFO dataset, we found it essential to build a data visualization with a map. A map serves two purposes: 1) It provides an orientation for the user to explore the data; 2) Enables the immediate selection of data points found in locations of interest and familiarity.

Layer 2 is driven by nominal and quantitative interval data. At this point, we want to enable the user with interactions and tools that allow them to filter the dataset into the data points that are most compelling for their curiosity. The user’s goal is to find anomalies and aberrations in the data that warrant a drill down to the specifics of a single sighting. We equipped the user with duration, time, and shape filters as these 3 attributes were the easiest to comprehend and drove further engagement.

Duration of Encounter Histogram: This histogram was created using a log scale. We made this decision because this is a helper tool. The data skews very much to the shorter end, so a linear scale wouldn’t have been helpful. We also omitted a Y axis label. While we could see the argument for this being partly misleading, we wanted to emphasize the fact that this is a tool and the focus is on the map and the stories found within. The color encoding for duration on the map matches this instagram, doubling it as a key. We considered adding an explicit key, but users found this to be intuitive as is. Lastly, this histogram updates and never adjusts the domain of the bins. We tested this on users and found it to be a more helpful tool this way.

Time Histogram: Similar to the duration of encounter histogram, we designed this to be a tool for searching. Much is the same as the duration histogram, accept the y-scaling updates anytime a new filter is applied. This choice was made because as you get down to fewer points (the goal), the bar heights are too small to perceive. We wanted users to identify rich moments in time.

Layer 3 is driven by qualitative temporal data. When the users finally arrive at the stories that are most exciting for them, they can read the full story associated with the sighting. The story serves as a reward for the user that we hope will spark a laugh. The user may return to Layer 2 or Layer 3 to restart the exploration process once again.

Our visualization layout places the Layer 2 filters at the top, the Layer 1 map in the left-center, and the Layer 3 story window in the right-center. Most of the screen is used by the map which serves as the main center of attention for the user. 

Visual Encodings

The key pieces of information encoded in our map are US cities and the duration of sightings. We felt that duration was an appropriate attribute in the dataset to show differentiation among sightings in the country. We made this decision to add additional context to the data points and create a more compelling visualization. This not only helps navigation, it visually ties the duration histogram to the map. As mentioned before, this color scale is reflected in the corresponding histogram. Duration is aggregated based on the user’s filter selection of time. 

We also considered using size as an encoding channel for duration but realized quickly through our prototypes that it would be a poor design choice, particularly when the user examines the data in large time frames. Data points with very long durations had large size encodings, which would often obscure state outlines and other data points with shorter durations.

Animation

There is significant delay in animation/interaction due to the large size of this dataset and need to comb through everything. We scaled back the time span from 60years, to 10, and finally the last 5. Further reductions do help this lag, but we wanted to leave a good amount of data available. If this were being published for a greater audience, we would take steps to improve performance.

D3 animation was applied to show the change in sightings over time. When a user alters the time & shape filters, the data points on the map either dissolve or emerge. In the earlier explanation of the histograms, we explain the choice for which scales are updated based on filter change. All decisions were made based on the narrative, searching for something interesting.

Interaction

For interaction, we have 2 sliders (duration of encounter and when it occurred) and a drop down menu for shape selection. The sliders were chosen because individuals who see the same thing will experience it around the same length and time, but not exact. Thus using a continuous control allows users to most effectively find like instances. For shape, we chose a discrete control because the duplicate sightings are described in the same ways.

Additionally, we chose to provide a tooltip for users to glance at high-level information about a UFO sighting when they hover over a data point.This information includes city, shape, state, and a summary description of the sighting. The purpose of this interaction is to deliver the minimum-level of information that would potentially enable a user to click on the data point for the full story.


DEVELOPMENT PROCESS

Dave & John are not computer scientists and programmers by training. The two of us are graduate students in the MIT IDM program, which teaches human-centered product design and interdisciplinary team leadership. 

We completed A4 by following the human-centered design process. First, we explored several datasets (Legos, Cereal Nutrition Data, Podcasts, Online Education, etc.) before narrowing down to this UFO dataset which we found hilarious and fun. Next, John explored the dataset via Tableau to understand its structure. Although it was presented as a clean dataset on Kaggle, the UFO data points had to be further cleaned. Beginning with 88,125 global city data points, John removed international cities, UFO sightings missing a known data, outlier sightings with extreme duration, and erroneous city names without geocoordinates. Dave further cleaned the data to represent only sightings from 2009-2019, the decade when most sightings have occurred.

Next, John & Dave went through a process of ideation and sketching before they began on any programming for A4. The two generated some very advanced concepts but realized as they began to build the visualization that many of the features that envisioned were beyond their coding abilities. The visualization design was scoped down and Dave & John decided to divide the build. Dave took on the D3 programming and John handled the front-end styling of the map.  (original design concept)

The visualization that we have submitted reflects our efforts to combine the interactive data visualization frameworks and concepts taught in class with our expertise in user experience, narrative & storytelling, and the human-centered design process.

TIME

Dave - It is hard to say how much time was spent on this project because I put a considerable amount of time into a crash course in javascript and d3js. In total, I probably spent around 5-6 hours on initial designs and sorting through datasets. For programming, I spent around 30 hours going through tutorials, MIT workshops, and practice exercises. Then I spent approximately another 20-30 hours programming for the project and debugging. 

John - I likely spent 20-25 hours working on the HTML, CSS, and JavaScript styling of our interactive data visualization. Similar to Dave, I spent 5-6 years on design and 2-3 hours on data cleaning.

SOURCES

Data from https://www.kaggle.com/thaddeussegura/ufo-sightings

Majority of the coding for all components of the project were adapted from a course Dave took over the past week from Mike Bostock, “Mastering Data Visualization in D3js” on Udemy. A copy of the repo can be found here: https://github.com/adamjanes/udemy-d3

Additional help for the map design: 
https://bost.ocks.org/mike/map/

Icons: Noun Project

Inspiration: https://multimedia.scmp.com/culture/article/ufo/index.html
