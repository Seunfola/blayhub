import React, { useState } from 'react';
import styles from './Ndaform.module.css';

const NDAForm = ({ onCheck }) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onCheck(newChecked);
  };

  const agreementText = `
NON-DISCLOSURE AGREEMENT
This Non-Disclosure Agreement (the "Agreement") is entered into as of _____________ (the "Effective Date"), by and between Blayhub ("Disclosing Party") and ______________ ("Receiving Party").

1. Definition of Confidential Information. For purposes of this Agreement, "Confidential Information" means any data or information, oral or written, disclosed by the Disclosing Party to the Receiving Party that is not generally known to the public, including but not limited to trade secrets, business plans, financial information, customer information, and technical data.

2. Obligations of Receiving Party. The Receiving Party agrees to:
(a) Keep all Confidential Information confidential and not disclose it to any third party without the prior written consent of the Disclosing Party.
(b) Use the Confidential Information only for the purpose of Job creation.
(c) Take all reasonable steps to protect the confidentiality of the Confidential Information.

3. Exceptions. Confidential Information does not include information that:
(a) Is or becomes publicly known through no breach of this Agreement by the Receiving Party.
(b) Is rightfully received by the Receiving Party from a third party without restriction and without breach of this Agreement.
(c) Is independently developed by the Receiving Party without the use of or reference to the Confidential Information.

4. Return of Materials. Upon termination of this Agreement, the Receiving Party agrees to return all materials containing Confidential Information to the Disclosing Party.

5. Term. This Agreement shall commence on the Effective Date and continue until terminated by either party upon 15 days written notice.

6. Governing Law. This Agreement shall be governed by and construed in accordance with the laws of United States.

7. Non-Disclosure Obligations. The Receiving Party agrees to restrict disclosure of Confidential Information to its employees, agents, or third parties as necessary and solely for the purpose of carrying out the business dealings between the parties, and to require those persons to sign and adhere to the terms of this Agreement.

8. Remedies. The Receiving Party acknowledges that any disclosure or misappropriation of any of the Confidential Information in violation of this Agreement may cause the Disclosing Party irreparable harm, the amount of which may be difficult to ascertain. Therefore, the Receiving Party agrees that the Disclosing Party shall have the right to apply to any court of competent jurisdiction for an order restraining any such further disclosure or misappropriation and for such other relief as the Disclosing Party shall deem appropriate. This right of the Disclosing Party is to be in addition to the remedies otherwise available to the Disclosing Party at law or in equity.

9. No License. Nothing in this Agreement is intended to grant any rights to the Receiving Party under any patent, copyright, trade secret, or other intellectual property rights of the Disclosing Party, nor shall this Agreement grant the Receiving Party any rights in or to the Confidential Information except as expressly set forth herein.

10. No Warranties. The Disclosing Party makes no representations or warranties, express or implied, regarding the accuracy or completeness of the Confidential Information. The Receiving Party agrees that the Disclosing Party shall not have any liability resulting from the use of the Confidential Information.

11. Entire Agreement. This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral, between the parties with respect to such subject matter.

12. Amendments. This Agreement may not be amended or modified except by a written agreement signed by both parties.

13. Waiver. No waiver of any provision of this Agreement shall be deemed or shall constitute a waiver of any other provision hereof (whether or not similar), nor shall any such waiver constitute a continuing waiver unless otherwise expressly provided.

14. Assignment. Neither party shall assign any of its rights or obligations hereunder without the prior written consent of the other party, except that the Disclosing Party may assign this Agreement in connection with the sale or transfer of all or substantially all of its business or assets to which this Agreement relates.

15. Binding Effect. This Agreement shall be binding upon and inure to the benefit of the parties hereto and their respective successors and permitted assigns.

16. Severability. If any provision of this Agreement is found to be invalid or unenforceable by a court of competent jurisdiction, such provision shall be severed from the remainder of this Agreement, which will remain in full force and effect.

17. Counterparts. This Agreement may be executed in counterparts, each of which shall be deemed an original and all of which together shall constitute one and the same instrument.

IN WITNESS WHEREOF, the parties hereto have executed this Non-Disclosure Agreement as of the Effective Date.

CONFIDENTIALITY OBLIGATIONS

1. Non-Disclosure of Confidential Information. The Receiving Party shall not, during the term of this Agreement or at any time thereafter, disclose any Confidential Information to any person or entity except as necessary to carry out the purposes of this Agreement or as expressly authorized by the Disclosing Party in writing.

2. Use of Confidential Information. The Receiving Party agrees to use the Confidential Information solely for the purpose of evaluating or engaging in discussions concerning a potential business relationship or for the performance of its obligations under this Agreement.

3. Protection of Confidential Information. The Receiving Party agrees to take all reasonable measures to protect the confidentiality of the Confidential Information and to prevent any unauthorized use or disclosure thereof. These measures shall include, without limitation, taking at least those measures that the Receiving Party takes to protect its own confidential information of a similar nature.

4. Disclosure Required by Law. In the event that the Receiving Party is required by law to disclose any Confidential Information, the Receiving Party shall promptly notify the Disclosing Party in writing of such requirement so that the Disclosing Party may seek an appropriate protective order or waive compliance with the provisions of this Agreement. The Receiving Party shall disclose only that portion of the Confidential Information that is legally required to be disclosed and shall use reasonable efforts to obtain assurances that confidential treatment will be accorded to such Confidential Information.

5. Notice of Unauthorized Use or Disclosure. The Receiving Party shall promptly notify the Disclosing Party in writing of any unauthorized use or disclosure of the Confidential Information of which the Receiving Party becomes aware and shall take all reasonable steps to prevent any further unauthorized use or disclosure thereof.

6. No Publicity. The Receiving Party agrees not to disclose the existence of this Agreement, the discussions between the parties, or the potential business relationship between the parties to any third party without the prior written consent of the Disclosing Party, except as required by law.

7. No Obligation to Proceed. Nothing in this Agreement shall obligate either party to proceed with any business relationship between them, and each party reserves the right, in its sole discretion, to terminate the discussions contemplated by this Agreement.

8. Termination. Either party may terminate this Agreement with or without cause upon written notice to the other party. Upon termination, the Receiving Party shall return or destroy all Confidential Information and all copies thereof, whether in tangible or intangible form, and shall provide written certification of such return or destruction to the Disclosing Party.

9. Survival. The obligations of the Receiving Party with respect to Confidential Information shall survive the termination of this Agreement and shall continue until the Confidential Information is no longer confidential or until the Disclosing Party provides written consent releasing the Receiving Party from its obligations under this Agreement.

10. Miscellaneous. This Agreement shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of laws principles. Any legal action or proceeding arising under this Agreement shall be brought exclusively in the federal or state courts located in Texas, United Sates, and the parties hereby consent to the personal jurisdiction and venue therein.

IN WITNESS WHEREOF, the parties hereto have executed this Non-Disclosure Agreement as of the Effective Date.
  `;

  const agreementLines = agreementText.trim().split('\n').map((line, index) => (
    <span key={index} className={styles.line}>{line}</span>
  ));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Non-Disclosure Agreement (NDA)</h2>
      <p className={styles.description}>Please read and accept the NDA before proceeding:</p>
      <div className={styles.textarea}>
        {agreementLines}
      </div>
      <div className={styles.checkboxContainer}>
        <input type="checkbox" checked={checked} onChange={handleCheck} />
        <label className={styles.label}>I have read and agree to the NDA</label>
      </div>
    </div>
  );
};

export default NDAForm;
