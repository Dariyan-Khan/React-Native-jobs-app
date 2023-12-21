import {Text, View, SafeAreaView, ActivityIndicator, RefreshControl, ScrollView}from 'react-native';
import {Stack, useRouter, useSearchParams} from 'expo-router'; 
import { useCallback, useState} from 'react';

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import {COLORS, SIZES, icons} from '../../constants';
import useFetch from '../../hook/useFetch';



const JobDetails = () => {
    
    const params = useSearchParams()
    const router = useRouter()

    const tabs = ["About", "Qualifications", "Responsibilities"]

    const { data, isLoading, error, refetch } = useFetch('job-details', {
        job_id: params.id
    })


    // This is code for template data

    let rel_data;

    for (const dataEntry of data){

        if(dataEntry.job_id === params.id){
            rel_data = dataEntry;
        }
    }
    /////////////////////////////////////////

    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        ref etch()
        setRefreshing(false)
    }, [])  

    const displayTabContent = () => {
        switch(activeTab){
            case 'Qualifications':
                return <Specifics
                        title='Qualifications'
                        //points = {job[0].job_highlights?.Qualifications ?? ['N/A']}
                        points={rel_data.job_highlights?.Qualifications ?? ['N/A']}
                        />
            case 'About':
                return <JobAbout
                        // info={data[0].job_description ?? "No data provided"}
                        info={rel_data.job_description ?? "No data provided"}
                        />
            case 'Responsibilities':
                return  <Specifics
                            title='Responsibilities'
                            //points = {job[0].job_highlights?.Qualifications ?? ['N/A']}
                            points={rel_data.job_highlights?.Responsibilities ?? ['N/A']}
                        />
                        // <Specifics
                        // title='Responsibilites'
                        // //points = {job[0].job_highlights?.Qualifications ?? ['N/A']}
                        // points={rel_data.job_highlights?.Responsibilites ?? ['N/A']}
                        // />
            default:
                break;

        }
    }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
        options={{
            headerStyle: {backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft : () => (
                <ScreenHeaderBtn
                iconURL={icons.left}
                dimension='60%'
                handlePress={() => router.back()}/>
            ),
            headerRight : () => (
                <ScreenHeaderBtn
                iconURL={icons.share}
                dimension='60%'
                handlePress={() => {}}/>
            )
        }}>
        </Stack.Screen>
        <>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl 
                                                                        refreshing={refreshing}
                                                                        onRefresh={onRefresh}/>}>
        
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary}/>)
                : error ? (
                    <Text> Something went wrong</Text>

                ) : data.length === 0 ? (
                    <Text> No data</Text>
                ) : ( 
                    <View style={{ padding: SIZES.medium, paddingBottom: 100}}>

                        {/* <Company
                        companyLogo={data[0].employer_logo}
                        jobTitle={data[0].job_title}
                        companyName={data[0].employer_name}
                        location={data[0].job_country}>   
                        </Company> */}

                        <Company
                        companyLogo={rel_data.employer_logo}
                        jobTitle={rel_data.job_title}
                        companyName={rel_data.employer_name}
                        location={rel_data.job_country}>   
                        </Company>

                        <JobTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}>

                        </JobTabs>

                        {displayTabContent()}

                    </View>                    
                ) 
            }
                                                             
        </ScrollView>

        <JobFooter
            //url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}
            url={rel_data?.job_google_link ?? 'https://careers.google.com/jobs/results'}
        />
        </>

    </SafeAreaView>
  )
}

export default JobDetails