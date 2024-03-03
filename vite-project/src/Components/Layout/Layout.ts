const combineWithLayout = (outlet: string) => {
  const result = `
    <div>
      <nav>
        <a class="redirect-home">Home</a>
        <a class="redirect-project-create">Create</a>
      </nav>
      <div>
        ${outlet}
      </div>
    </div>
  `;

  return result;
};

export default combineWithLayout;
