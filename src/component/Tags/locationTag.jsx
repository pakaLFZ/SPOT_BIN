import React, {
    useState,
} from 'react'

import {
    useDispatch,  //发送请求
    useSelector   //获得数据
} from 'react-redux' // 发送请求的

import {
    withRouter,
    useHistory
} from 'react-router-dom'

import {
    Button,
    Space,
    Select,
    Input,
    Tooltip
} from "antd"
const { Option } = Select;

import {
    requestLocation
} from 'actions/tags'

export function SearchLocation(props){
    const onChange = props.onChange;
    const location = props.location;
    const dispatch = useDispatch();
    const showDetails = props.details;
    const { 
        provinces,
        cities,
        continents,
        countries,
     } = useSelector(state => state.tags);

    const [ f, sf ] = useState(true)
    const [ province, setProvince ] = useState(null)
    const [ city, setCity ] = useState(null)
    const [ country, setCountry ] = useState(null)
    const [ continent, setContinent ] = useState(null)
    const [ details, setDetails ] = useState(null)

    const ToBS = "#ToBeSelected"
    const WAIT = "#Waiting"


    function update(info){
        let infoData = null
        if (info.data){
            infoData=info.data;
        }
        if(info.type=="Continent"){
            setContinent(infoData)
            setCountry(null)
            setProvince(null)
            setCity(null)
            const data = {
                type: "country",
                continent: infoData,
                country: null,
                city: null,
                province: null,
                details: details
            }
            dispatch(requestLocation(data))
            onChange(data)
            
        } else if (info.type=="Country") {
            setCountry(infoData)
            setProvince(null)
            setCity(null)
            const data = {
                type: "province",
                continent: continent,
                country: infoData,
                province: null,
                city: null,
                details: details
            }
            dispatch(requestLocation(data))
            onChange(data)

        } else if (info.type=="Province") {
            setProvince(infoData)
            setCity(null)
            const data = {
                type: "city",
                continent: continent,
                country: country,
                province: infoData,
                city: null,
                details: details
            }
            dispatch(requestLocation(data))
            onChange(data)

        } else if(info.type=="City"){
            setCity(infoData)
            const data = {
                type: "city",
                continent: continent,
                country: country,
                province: province,
                city: infoData,
                details: details
            }
            onChange(data)
        } else if(info.type=="Details"){
            setDetails(infoData)
            const data = {
                type: "details",
                continent: continent,
                country: country,
                province: province,
                city: city,
                details: infoData
            }
            onChange(data)
        }
    }

    if (f){
        const iniLocationRequest = {
            continent: null,
            country: null,
            city: null,
            province: null,
            type: "continent"
        }
        dispatch(requestLocation(iniLocationRequest));
        if (location) {
            setCity(location.city);
            setProvince(location.province)
            setCountry(location.country)
            setContinent(location.continent)
            setDetails(location.details)
        }
        sf(false)
    }

    return (
        <div>
           <Space wrap>
                <LocationSelector 
                    items={continents}
                    type="Continent"
                    onSelect={(e)=>update(e)}
                    value={continent}
                    status={ToBS}
                />

                <LocationSelector 
                    items={countries}
                    type="Country"
                    onSelect={(e)=>update(e)}
                    value={country}
                    status={
                        continent?
                        ToBS
                        : WAIT
                    }
                />

                <LocationSelector 
                    items={provinces}
                    type="Province"
                    onSelect={(e)=>update(e)}
                    value={province}
                    status={
                        country?
                        ToBS
                        : WAIT
                    }
                />

                <LocationSelector 
                    items={cities}
                    type="City"
                    onSelect={(e)=>update(e)}
                    value={city}
                    status={
                        province?
                        ToBS
                        : WAIT
                    }
                />
                {
                    showDetails?
                    <Input
                        placeholder="Location Details"
                        maxLength={50}
                        onChange={(e)=>update({type:"Details", data:e.target.value})}
                        value={details}
                    />
                    : null
                }
           </Space>
        </div>
    )
}
function LocationSelector(props){
    const items = props.items
    const type = props.type
    const onSelect = props.onSelect;
    const value = props.value;
    const status = props.status;

    return (
        <div>
            <Select
                allowClear
                showSearch
                placeholder={"Select a " + type}
                onChange={(e)=>onSelect({type:type, data:e})}
                style={{ width: 160 }}
                value={value}
            >
                {
                        status == "#Waiting"?
                        <Option disabled>---</Option>:
                            items?
                            <> 
                                <Option disabled>To be selected</Option>
                                {
                                    items.map(
                                        (item, id)=> (
                                            <Option 
                                                value={item} 
                                                key={id}
                                            >
                                                {item}
                                            </Option>
                                        )
                                    )
                                }
                            </>
                            : <Option disabled>loading...</Option>
                }
            </Select>
        </div>
    )
}

export function ShowLocation(props){
    const small = props.small;
    const lock = props.lock;

    function EmptyTag(){
        return (
            <Tooltip title="Click to select">
                <Button
                    size={
                        small?
                        "small":
                        "middle"
                    }
                >
                    {
                        lock?
                        "No Location Specified":
                        "Select Location"
                    }
                </Button>
            </Tooltip>
        )
    }
    const location = props.location;
    if (location) {
        if (location.continent) {
            return (
                <div>
                    <Space wrap>
                        {
                            location.city ?
                            <Button size={small?"small":"middle"}>
                                {location.city}
                            </Button>
                            : null
                        }
                        {
                            location.province ?
                            <Button size={small?"small":"middle"}>
                                {location.province}
                            </Button>
                            : null
                        }
                        {
                            small ?
                            null:
                            <Button size={small?"small":"middle"}>
                                {location.country}
                            </Button>
                        }
                        {
                            small?
                            null :
                            <Button size="middle">
                                {location.continent}
                            </Button>
                        }
                        {
                            small?
                            null :
                            <Button size="middle" type="text">
                                {location.details}
                            </Button>
                        }
                       
                    </Space>
                </div>
            ) 
        } else {
            return <EmptyTag/>
        }
        
    } else {
        return <EmptyTag/>
    }
    
}