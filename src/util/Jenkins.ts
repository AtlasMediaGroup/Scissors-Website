import axios from "axios";

const JENKINS_URL: string = "https://ci.scissors.gg/job/"
const ARTIFACT_NAME: string = "Scissors"

export type Job = {
    name: string,
    url: string
}

export type Build = {
    number: number,
    url: string,
    changes?: BuildChange[],
    timestamp?: number,
    artifact?: string
}

export type BuildChange = {
    comment: string,
    id: string,
}

export function getJobs(): Promise<Job[]> {
    let jobs: Job[] = [];
    let request = axios.get(`${JENKINS_URL}/${ARTIFACT_NAME}/api/json?pretty=true`)

    return new Promise((resolve, reject) => {
        request.then(value => {
            jobs = value.data.jobs as Job[]
            resolve(jobs)
        }).catch(() => reject)
    })
}

export function getBuilds(version: string): Promise<Build[]> {
    let builds: Build[] = []
    let request = axios.get(`${JENKINS_URL}/${ARTIFACT_NAME}/job/${version}/api/json?pretty=true`)

    return new Promise((resolve, reject) => {
        request.then(value => {
            builds = value.data.builds as Build[]
            for (let build of builds) {
                axios.get(`${JENKINS_URL}/${ARTIFACT_NAME}/job/${version}/${build.number}/api/json?pretty=true`).then(value1 => {
                    let changeSet: any[] = value1.data.changeSets
                    if (changeSet.length > 0) {
                        let changes = changeSet[0].items as BuildChange[]
                        for (let change of changes) {
                            change.id = change.id.substring(0, 7)
                        }
                        build.changes = changes
                        if (value1.data.artifacts) {
                            let artifacts: any[] = value1.data.artifacts
                            if (artifacts.length > 0) {
                                build.artifact = value1.data.artifacts[0].relativePath
                            }
                        }

                        resolve(builds)
                    }
                })
            }
        }).catch(() => reject)
    })
}

