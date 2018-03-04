import {ImisContextProvider, ImisRestClient, ImisSearchFormDataProvider} from "./services";

jQuery(payload);

function payload() {
    ImisContextProvider
        .getContextAsync()
        .then(
            context => ImisSearchFormDataProvider
                .getDataAsync()
                .then(
                    searchData => {

                        console.log(`${context.user.id}, ${searchData.searchPhrase}, ${searchData.entriesCount}`);

                        const partyIdStr = String(context.user.id);

                        const activityData = {
                            "$type": "Asi.Soa.Core.DataContracts.GenericEntityData, Asi.Contracts",
                            "EntityTypeName": "Activity",
                            "PrimaryParentEntityTypeName": "Party",
                            "PrimaryParentIdentity": {
                                "$type": "Asi.Soa.Core.DataContracts.IdentityData, Asi.Contracts",
                                "EntityTypeName": "Party",
                                "IdentityElements": {
                                    "$type": "System.Collections.ObjectModel.Collection`1[[System.String, mscorlib]], mscorlib",
                                    "$values": [partyIdStr]
                                }
                            },
                            "Properties": {
                                "$type": "Asi.Soa.Core.DataContracts.GenericPropertyDataCollection, Asi.Contracts",
                                "$values": [
                                    {
                                        "$type": "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
                                        "Name": "ACTIVITY_TYPE",
                                        "Value": "CALL"
                                    },
                                    {
                                        "$type": "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
                                        "Name": "DESCRIPTION",
                                        "Value": searchData.searchPhrase
                                    },
                                    {
                                        "$type": "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
                                        "Name": "PartyId",
                                        "Value": partyIdStr
                                    },
                                    {
                                        "$type": "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
                                        "Name": "UNITS",
                                        "Value": {
                                            "$type": "System.Decimal",
                                            "$value": searchData.entriesCount
                                        }
                                    }
                                ]
                            }
                        };

                        return ImisRestClient
                            .postAsync(
                                `/activity`,
                                { "Content-Type": "application/json" },
                                activityData
                            )
                            .then(
                                result => console.log(result)
                            );

                    }
                )
        )
        .catch(reason => console.error(`Unable to collect search data: ${reason}`));
}
