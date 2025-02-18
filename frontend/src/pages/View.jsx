const View = () =>{
    return(
        <div>
            <h2 className="text-2 p-2"></h2>
            {/* <table id="spr-table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Textbook</th>
                    </tr>
                </thead>
                <tbody>
                    {userData && userData.SPR.map((item, index) => 
                        <>
                            <tr key={`spr-${index}`}>
                                <td key={`spr-${index}-id`}>{item.id}</td>
                                <td key={`spr-${index}-name`}>{item.name}</td>
                                <td key={`spr-${index}-textbook`}>{item.textbook}</td>
                            </tr>

                        </>
                    )}
                </tbody>
               
            </table> */}
            <h2 className="text-2 p-2">Level Check</h2>
            {/* 
            <table id="level-check-table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {userData && userData.levelCheck.map((item) =>
                        <tr key={`${levelCheckid}}`}>
                            <td key={`${levelCheckid}-levelCheck-id`}>{item.id}</td>
                            <td key={`${levelCheckid}-levelCheck-name`}>{item.name}</td>
                            <td key={`${levelCheckid}-levelCheck-feedback`}>{item.feedback}</td>
                        </tr>
                    )}
                </tbody>
            </table> */}

        </div>
    )
}

export default View;