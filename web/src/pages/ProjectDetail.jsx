import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/projects/${id}`).then(r => r.json()).then(setProject)
  }, [id])

  if (!project) return null

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex items-center gap-4">
        <img src="/images/project-detail.svg" alt="Project detail header" className="h-20" />
        <h1 className="text-3xl font-semibold">{project.title}</h1>
      </div>
      <p className="mt-4 text-neutral-300">{project.description}</p>
    </div>
  )
}
