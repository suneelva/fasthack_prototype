import React, { Component } from "react";
import extend from "lodash/extend";
import {
  SearchkitManager,
  SearchkitProvider,
  SearchBox,
  RefinementListFilter,
  Pagination,
  HierarchicalMenuFilter,
  HitsStats,
  SortingSelector,
  NoHits,
  ResetFilters,
  RangeFilter,
  NumericRefinementListFilter,
  ViewSwitcherHits,
  ViewSwitcherToggle,
  DynamicRangeFilter,
  InputFilter,
  GroupedSelectedFilters,
  Layout,
  TopBar,
  LayoutBody,
  LayoutResults,
  ActionBar,
  ActionBarRow,
  SideBar
} from "searchkit";
import "./index.css";

//const host = "http://demo.searchkit.co/api/movies"
const searchkit = new SearchkitManager(
  "https://ac73219f2b5e4f0484e0896a5f76be84.us-central1.gcp.cloud.es.io:9243/fasthack/",
  {
    basicAuth: "elastic:vcPQZOm6y7uSveax8Jqyw4as"
  }
);

const MovieHitsGridItem = props => {
  const { bemBlocks, result } = props;
  let url = "" + result._source.imdbId;
  const source = extend({}, result._source, result.highlight);
  return (
    <div
      className={bemBlocks.item().mix(bemBlocks.container("item"))}
      data-qa="hit"
    >
      <a href={url} target="_blank">
        <div
          data-qa="name"
          className={bemBlocks.item("title")}
          dangerouslySetInnerHTML={{ __html: source.campaign.name }}
        />
      </a>
    </div>
  );
};

const MovieHitsListItem = props => {
  const { bemBlocks, result } = props;
  let url = "" + result._source.imdbId;
  const source = extend({}, result._source, result.highlight);
  return (
    <div
      className={bemBlocks.item().mix(bemBlocks.container("item"))}
      data-qa="hit"
    >
      <div className={bemBlocks.item("poster")}>
        <img alt="" data-qa="poster" src={result._source.poster} />
      </div>

      <div className={bemBlocks.item("details")}>
        <a href={url} target="_blank">
          <h2
            className={bemBlocks.item("title")}
            dangerouslySetInnerHTML={{
              __html: source.campaignEntry.resource.name
            }}
          />
        </a>
        <h3 className={bemBlocks.item("subtitle")}>
          Visa Status: {source.campaignEntry.resource.visaStatus}
        </h3>
        <h3 className={bemBlocks.item("subtitle")}>
          Vendor: {source.campaignEntry.requirement.vendorName}{" "}
        </h3>
      </div>
    </div>
  );
};

class App2 extends Component {
  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
            <div className="my-logo">Techkey Systems</div>
            <SearchBox
              autofocus={true}
              searchOnChange={true}
              prefixQueryFields={[
                "actors^1",
                "type^2",
                "languages",
                "campaignEntry.name^10"
              ]}
            />
          </TopBar>

          <LayoutBody>
            <SideBar>
              <InputFilter
                id="writers"
                searchThrottleTime={500}
                title="Search"
                placeholder="Search"
                searchOnChange={true}
                queryFields={["_all"]}
              />
              <HierarchicalMenuFilter
                fields={["campaignEntry.name.keyword"]}
                title="Categories"
                id="categories"
              />
              <HierarchicalMenuFilter
                fields={["campaignEntry.resource.visaStatus.keyword"]}
                title="Visa Status"
                id="visastatus"
              />
              <DynamicRangeFilter
                field="campaignEntry.requirement.billRate"
                id="billrate"
                title="Bill Rate"
                rangeFormatter={count => count + "*"}
              />
              <DynamicRangeFilter
                field="campaignEntry.resource.payRate"
                id="payrate"
                title="Pay Rate"
                rangeFormatter={count => count + "*"}
              />
              <RangeFilter
                min={0}
                max={10}
                field="campaignEntry.resource.payRate1"
                id="imdbRating"
                title="IMDB Rating"
                showHistogram={true}
              />
              <RefinementListFilter
                id="actors"
                title="Resources"
                field="campaignEntry.resource.name.keyword"
                size={10}
              />
              <RefinementListFilter
                id="countries"
                title="Locations"
                field="campaignEntry.requirement.location.keyword"
                operator="OR"
                size={10}
              />
            </SideBar>
            <LayoutResults>
              <ActionBar>
                <ActionBarRow>
                  <HitsStats
                    translations={{
                      "hitstats.results_found": "{hitCount} results found"
                    }}
                  />
                  <ViewSwitcherToggle />
                </ActionBarRow>

                <ActionBarRow>
                  <GroupedSelectedFilters />
                  <ResetFilters />
                </ActionBarRow>
              </ActionBar>

              <ViewSwitcherHits
                hitsPerPage={5}
                highlightFields={["campaignEntry.name"]}
                sourceFilter={["campaignEntry"]}
                hitComponents={[
                  //   {key:"grid", title:"Grid", itemComponent:MovieHitsGridItem},
                  {
                    key: "list",
                    title: "List",
                    itemComponent: MovieHitsListItem,
                    defaultOption: true
                  }
                ]}
                scrollTo="body"
              />
              <NoHits suggestionsField={"title"} />
              <Pagination showNumbers={true} />
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default App2;
