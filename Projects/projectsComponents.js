// React Components for Projects Page
const { useState } = React;

// Individual Project Component
const Project = ({
    thumbnailSrc,
    projectUrl,
    title,
    date,
    description,
    sameTab = false,
    isLast = false
}) => {
    const linkTarget = sameTab ? "_self" : "_blank";
    const linkRel = sameTab ? "" : "noopener noreferrer";

    return (
        <>
            <table>
                <tr>
                    <td className="project-thumbnail">
                        <a
                            href={projectUrl}
                            target={linkTarget}
                            rel={linkRel}
                        >
                            <img
                                src={thumbnailSrc}
                                alt={`${title} thumbnail`}
                            />
                        </a>
                    </td>
                    <td>
                        <h3>
                            <a
                                href={projectUrl}
                                target={linkTarget}
                                rel={linkRel}
                            >
                                {title}
                            </a>
                            {' '}({date}).
                        </h3>
                        {description}
                    </td>
                </tr>
            </table>
            {!isLast && <hr />}
        </>
    );
};

// Main Projects List Component
const ProjectsList = () => {
    return (
        <div>
            {window.projectsData.map((project, index) => (
                <Project
                    key={project.id}
                    thumbnailSrc={project.thumbnailSrc}
                    projectUrl={project.projectUrl}
                    title={project.title}
                    date={project.date}
                    description={project.description}
                    sameTab={project.sameTab}
                    isLast={index === window.projectsData.length - 1}
                />
            ))}
        </div>
    );
};

// Render the component
ReactDOM.render(<ProjectsList />, document.getElementById('projects-root'));