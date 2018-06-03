import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Grid from '@material-ui/core/Grid';
import CampaignItem from "./CampaignItem";

import {
  SearchkitManager,
  SearchkitProvider,
  Layout,
  TopBar,
  LayoutBody,
  SideBar,
  LayoutResults,
  ActionBar,
  ActionBarRow,
  MovieHitsGridItem,
  NoHits,
  SearchBox,
  HierarchicalMenuFilter,
  RefinementListFilter,
  HitsStats,
  SelectedFilters,
  ResetFilters,
  Hits
} from "searchkit";

const searchkit = new SearchkitManager(
  "https://ac73219f2b5e4f0484e0896a5f76be84.us-central1.gcp.cloud.es.io:9243/fasthack/",
  {
    basicAuth: "elastic:vcPQZOm6y7uSveax8Jqyw4as"
  }
);

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchkitProvider searchkit={searchkit}>
          <Layout>
            <TopBar>
              <SearchBox
                autofocus={true}
                searchOnChange={true}
                prefixQueryFields={[
                  "campaignEntry.name",
                  "campaignEntry.organization.name",
                  "campaignEntry.cause_tags.name",
                  "campaignEntry.activists.name"
                ]}
              />
            </TopBar>
            <LayoutBody>
              <SideBar>
                <HierarchicalMenuFilter
                  fields={["campaignEntry.name.keyword"]}
                  fielddata={true}
                  title="Campaign Name"
                  id="campaignEntry"
                />
                <HierarchicalMenuFilter
                  fields={["campaignEntry.organization.name.keyword"]}
                  fielddata={true}
                  title="NGOs"
                  id="campaignEntry.activists"
                />
                <HierarchicalMenuFilter
                  fields={["campaignEntry.cause_tags.name.keyword"]}
                  fielddata={true}
                  title="Causes"
                  id="campaignEntry.cause_tags"
                />
                <RefinementListFilter
                  id="activists"
                  title="Activists"
                  field="campaignEntry.activists.name.keyword"
                  operator="AND"
                  size={10}
                />
              </SideBar>
              <LayoutResults>
                <ActionBar>
                  <ActionBarRow>
                    <HitsStats />
                  </ActionBarRow>

                  <ActionBarRow>
                    <SelectedFilters />
                    <ResetFilters />
                  </ActionBarRow>
                </ActionBar>
                <div style={styles.root}>
               <Grid container spacing={24}>
                  <Grid item xs={12}>
                 <Hits
                   mod="sk-hits-grid"
                   hitsPerPage={10}
                   itemComponent={<CampaignItem />}
                   sourceFilter={["campaignEntry"]}
                   />
                 </Grid>
               </Grid>
               </div> 
                <NoHits />
              </LayoutResults>
            </LayoutBody>
          </Layout>
        </SearchkitProvider>
      </div>
    );
  }
}

export default App;
