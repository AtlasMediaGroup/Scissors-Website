import dayjs from "dayjs";
import { useEffect, useState } from "react"
import { Container, Button } from "react-bootstrap"

import "../css/DownloadPage.css"
import { Build, getBuilds, getJobs, Job } from "../util/Jenkins";

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

    return (
        <Container fluid>
            <div className="header">
                <h1>Scissors Downloads</h1>
            </div>
            <br />
            <div className="download_section">
                <ul className="versions">
                    {Array.from(jobs.keys()).sort(function (x, y) {
                        let x1 = x.name.split(".")
                        let y1 = y.name.split(".")
                        if (x1.length >= 3) {
                            x1 = x1.slice(0, x1.length - 1)
                        }
                        if (y1.length >= 3) {
                            y1 = y1.slice(0, y1.length - 1)
                        }
                        return y1.join(".") > x1.join(".") ? 1 : -1
                    }).map(job => {
                        return <li key={job.name} className={version === job.name ? "selected" : "selectable"} onClick={() => setVersion(job.name)}>{job.name}</li>
                    })}
                </ul>
                <br /><br />
                <table className="downloads">
                    <tbody>
                        {jobs.get(Array.from(jobs.keys()).filter(value => value.name == version)[0])?.map(value => {
                            return <tr key={value.number}>
                                <td align="center"><Button className="download" href={value.artifact ? `${value.url}/artifact/${value.artifact}` : value.url}>#{value.number}</Button></td>
                                <td className="commits"><ul>{value.changes?.map(value1 => {
                                    return (<li key={value1.id}>[<a className="commit_id" href={value1.id !== "x" ? `https://github.com/AtlasMediaGroup/Scissors/commit/${value1.id}` : `https://github.com/AtlasMediaGroup/Scissors/tree/${version}`}>{value1.id}</a>]&nbsp;&nbsp;{value1.comment}</li>)
                                })}</ul></td>
                                <td className="date" align="center">{dayjs(value.timestamp!).format("MM/DD/YYYY [at] hh:mm A")}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </Container>
    )
}

export default DownloadPage