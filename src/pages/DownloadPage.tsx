import React, { useEffect, useState } from "react";
import "../css/HomePage.css"
import { Build, getBuilds, getJobs, Job } from "../util/Jenkins";

import "../css/DownloadPage.css"
import { Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Container } from "react-bootstrap";

// Currently the timestamp here is undefined regardless of jenkins timestamp!

const DownloadPage = () => {
    const [jobs, setJobs] = useState(new Map<Job, Build[]>())
    const [version, setVersion] = useState("1.19")
    const versions = ["1.17.1", "1.18.2", "1.19"]
    useEffect(() => {
        doJobs().then(value => {
        })
    }, [])

    function doJobs(): Promise<void> {
        return new Promise(resolve => {
            getJobs().then(value => {
                for (let job of value) {
                    // if the job name is not included in versions array, then skip it.
                    if (!versions.includes(job.name)) {
                        continue;
                    }

                    getBuilds(job.name).then(value1 => {
                        setJobs(prevState => {
                            let newState = new Map(prevState)
                            newState.set(job, value1)
                            return newState
                        })
                        resolve()
                    })
                }
            })
        })
    }

    function onClick(event: React.MouseEvent<HTMLLIElement>) {
        setVersion(event.currentTarget.innerHTML)
    }

    return (
        <Container fluid className="p-4">
            <Alert variant="secondary">
                <Alert.Heading>Scissors Downloads</Alert.Heading>
                <p>
                    You may download builds of Scissors from here. Select the version you would like below. If the downloads page is not working, please use our <a href="https://ci.scissors.gg/job/Scissors">CI Server</a> instead.
                </p>
                <hr />
                <p className="mb-0">
                    P.S. If you know React, PLEASE help us make this look better. Our code is <a href="https://github.com/AtlasMediaGroup/Scissors-Website/tree/master">here</a>.
                </p>
            </Alert>
            <ul className="versions">
                {Array.from(jobs.keys()).sort(function(x, y) {
                    let x1 = x.name.split(".")
                    let y1 = y.name.split(".")
                    if (x1.length >= 3) {
                        x1 = x1.slice(0, x1.length - 1)
                    }
                    if (y1.length >= 3) {
                        y1 = y1.slice(0, y1.length - 1)
                    }
                    return y1.join(".") > x1.join(".") ? 1 : -1
                }).map(value => {
                    return <li className={version === value.name ? "selected" : "selectable"}
                        onClick={onClick}>{value.name}</li>
                })}
            </ul>
            <ul className="builds">
                {jobs.get(Array.from(jobs.keys()).filter(value => value.name === version)[0])?.map(value => {
                    return <li>
                        <Button href={value.artifact ? `${value.url}/artifact/${value.artifact}` : value.url}>#{value.number}</Button>
                        <ul className={`changes-${value.number}`}>
                            {value.changes?.map(value1 => {
                                return <li>[<a href={`https://github.com/AtlasMediaGroup/Scissors/commit/${value1.id}`}>{value1.id}</a>]&nbsp;&nbsp;{value1.comment}</li>
                            })}
                        </ul>
                        <span className={value.changes && value.changes?.length > 0 ? "date" : "date nochanges"}>{new Date(value.timestamp!).toISOString().split("T")[0]}</span>
                    </li>
                })}
            </ul>
        </Container >
    );
}

export default DownloadPage;