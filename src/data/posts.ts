export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string;
}

export const posts: BlogPost[] = [
  {
    id: '1',
    title: "Homework 1 - Statistics, and why can it be useful for cybersecurity?",
    excerpt: 'An exploration of how statistical methods and analysis can enhance cybersecurity practices and threat detection.',
    date: '2025-01-07',
    slug: 'statistics-cybersecurity',
    content: `
# What is statistics, and why can it be useful for cybersecurity?

## Introduction

Statistics is the science of collecting, analyzing, interpreting, and presenting data. It provides us with tools and methodologies to make sense of large amounts of information, identify patterns, and make informed decisions based on evidence rather than intuition.

## What is Statistics?

Statistics encompasses several key areas:

### Descriptive Statistics
- **Data summarization**: Mean, median, mode, standard deviation
- **Data visualization**: Charts, graphs, and plots
- **Pattern identification**: Trends and distributions in data

### Inferential Statistics
- **Hypothesis testing**: Drawing conclusions about populations from samples
- **Confidence intervals**: Estimating ranges of likely values
- **Regression analysis**: Understanding relationships between variables

### Probability Theory
- **Risk assessment**: Calculating likelihood of events
- **Predictive modeling**: Forecasting future outcomes
- **Uncertainty quantification**: Measuring and managing uncertainty

## Statistics in Cybersecurity

The application of statistics in cybersecurity is both powerful and essential in today's digital landscape:

### 1. Threat Detection and Analysis

**Anomaly Detection**: Statistical models can identify unusual patterns in network traffic, user behavior, or system performance that may indicate security threats.

- **Baseline establishment**: Using historical data to establish normal behavior patterns
- **Deviation detection**: Identifying when current behavior significantly differs from established norms
- **False positive reduction**: Using statistical significance testing to reduce false alarms

### 2. Risk Assessment and Management

**Quantitative Risk Analysis**: Statistics helps organizations quantify cybersecurity risks in measurable terms.

- **Vulnerability scoring**: Using statistical models to prioritize security vulnerabilities
- **Impact assessment**: Calculating potential financial and operational impacts of security incidents
- **Resource allocation**: Optimizing security investments based on statistical risk models

### 3. Incident Response and Forensics

**Pattern Recognition**: Statistical analysis helps identify attack patterns and attribution.

- **Attack signature analysis**: Identifying common characteristics of different attack types
- **Timeline reconstruction**: Using statistical correlation to piece together incident timelines
- **Evidence validation**: Applying statistical methods to validate digital evidence

### 4. Predictive Security

**Forecasting and Prevention**: Statistical models can predict future security threats and trends.

- **Threat intelligence**: Analyzing historical attack data to predict future threats
- **Seasonal patterns**: Identifying time-based patterns in cyber attacks
- **Trend analysis**: Understanding how the threat landscape evolves over time

### 5. Security Metrics and KPIs

**Performance Measurement**: Statistics provides frameworks for measuring security effectiveness.

- **Security posture assessment**: Quantifying overall security health
- **Incident metrics**: Measuring response times, resolution rates, and effectiveness
- **Compliance monitoring**: Statistical sampling for audit and compliance verification

## Real-World Applications

### Network Security
- **Traffic analysis**: Identifying DDoS attacks through statistical traffic pattern analysis
- **Intrusion detection**: Using statistical models to detect unauthorized access attempts
- **Bandwidth monitoring**: Detecting unusual data exfiltration through statistical analysis

### User Behavior Analytics (UBA)
- **Insider threat detection**: Identifying malicious insider activity through behavioral statistics
- **Account compromise detection**: Recognizing when user accounts may be compromised
- **Access pattern analysis**: Understanding normal vs. abnormal access patterns

### Malware Detection
- **Signature analysis**: Using statistical methods to identify malware characteristics
- **Behavioral analysis**: Detecting malware through statistical analysis of system behavior
- **Zero-day detection**: Identifying previously unknown threats through statistical anomaly detection

## Challenges and Considerations

### Data Quality
- **Incomplete data**: Dealing with missing or incomplete security logs
- **Data bias**: Ensuring statistical models aren't skewed by biased data collection
- **Data volume**: Managing and analyzing massive amounts of security data

### Model Accuracy
- **False positives**: Balancing sensitivity with specificity in threat detection
- **Model drift**: Ensuring statistical models remain accurate as threats evolve
- **Adversarial attacks**: Protecting statistical models from manipulation by attackers

## Conclusion

Statistics serves as a fundamental tool in modern cybersecurity, enabling organizations to:

1. **Make data-driven security decisions** rather than relying on intuition
2. **Quantify and communicate risk** in business terms
3. **Detect threats more effectively** through pattern recognition and anomaly detection
4. **Optimize security investments** based on statistical risk analysis
5. **Measure and improve security performance** through quantitative metrics

As cyber threats continue to evolve in complexity and scale, the role of statistics in cybersecurity will only become more critical. Organizations that effectively leverage statistical methods will be better positioned to defend against current threats and adapt to future challenges.

The intersection of statistics and cybersecurity represents a powerful combination that transforms raw security data into actionable intelligence, enabling more effective protection of digital assets and infrastructure.
    `
  },
    {
    id: '2',
    title: "Homework 2 - Dataset, Distribution and Caesar Cipher",
    excerpt: 'Understanding datasets and distributions with LibreOffice Base, and exploring text encryption and decryption with JavaScript.',
    date: '2025-10-13',
    slug: 'dataset-distribution-caesar-cipher',
    content: `
# Homework 2 – Dataset, Distribution and Caesar Cipher

## 1️⃣ Dataset and Distribution

### Concept
A **dataset** is a structured collection of related data, typically organized in tables with rows (records) and columns (attributes).  
A **distribution** represents how values are spread across categories or numerical ranges — for example, how many students belong to each age group.

### Implementation
Using **LibreOffice Base 25.8** (a DBMS similar to Microsoft Access), I created a simple dataset with the following table:

#### Table: Studenti
| ID | Età | Sesso | OreStudio |
|----|-----|--------|-----------|
| 1  | 20  | M      | 5         |
| 2  | 22  | F      | 7         |
| 3  | 21  | M      | 8         |
| 4  | 20  | F      | 6         |
| 5  | 21  | M      | 7         |

From this dataset, I computed **k-invariate distributions** (with k ≤ 3).

---

### Query 1 – Distribution by Age
\`\`\`sql
SELECT Età, COUNT(*) AS Frequenza
FROM Studenti
GROUP BY Età;
\`\`\`

**Result:**
| Età | Frequenza |
|-----|------------|
| 20  | 2 |
| 21  | 2 |
| 22  | 1 |

---

### Query 2 – Distribution by Age and Gender
\`\`\`sql
SELECT Età, Sesso, COUNT(*) AS Frequenza
FROM Studenti
GROUP BY Età, Sesso;
\`\`\`

**Result:**
| Età | Sesso | Frequenza |
|-----|--------|------------|
| 20  | F | 1 |
| 20  | M | 1 |
| 21  | M | 2 |
| 22  | F | 1 |

---

These queries show how to compute **univariate** (Età), **bivariate** (Età + Sesso), or **trivariate** distributions using SQL.

---

## 2️⃣ Text Analysis with JavaScript

In the second part, I worked with **JavaScript** in **Visual Studio Code** to analyze text, apply encryption (Caesar Cipher), and perform automated decryption.

The chosen texts were:
- **Short text:** “HELLO WORLD”
- **Long text:**  
  “LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIT. SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA.”

---

### (a) Letter Distribution
The first script calculates how often each letter appears and the percentage of each letter, ordered from most to least frequent.

**Example Output:**
\`\`\`
PS C:\\Users\\alela\\Desktop\\CesarCipher> node distribution.js
Testo: LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIT. SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA.
Distribuzione delle lettere (ord. per frequenza):
{
  I: '11.65',
  E: '10.68',
  O: '9.71',
  T: '8.74',
  D: '7.77',
  A: '6.80',
  L: '5.83',
  R: '5.83',
  M: '5.83',
  S: '5.83',
  U: '5.83',
  N: '4.85',
  C: '3.88',
  P: '2.91',
  G: '1.94',
  B: '0.97',
  Q: '0.97'
}
\`\`\`

This shows the distribution of letters — a fundamental step in text analysis and cryptography.

---

### (b) Caesar Cipher
A **Caesar Cipher** is a substitution cipher that shifts every letter by a fixed number in the alphabet.  
For example, a shift of **3** transforms “HELLO WORLD” into “KHOOR ZRUOG”.

---

### (c) Brute Force Decode
If the shift is unknown, the program can try all 26 possible shifts and display all the results.

**Example Output:**
\`\`\`
PS C:\\Users\\alela\\Desktop\\CesarCipher> node brute_decode.js
🔍 Possibili decodifiche:

Shift 0: KHOOR ZRUOG
Shift 1: JGNNQ YQTNF
Shift 2: IFMMP XPSME
Shift 3: HELLO WORLD
Shift 4: GDKKN VNQKC
...
Shift 25: LIPPS ASVPH
\`\`\`

Here, the correct message (“HELLO WORLD”) appears at **shift 3**, revealing the original text.

---

### (d) Language Distribution Decode
A smarter decoding method uses **language frequency analysis**.  
The script compares the letter frequencies of the encrypted text with the typical frequencies of English to estimate the most probable shift automatically.

**Example Output:**
\`\`\`
PS C:\\Users\\alela\\Desktop\\CesarCipher> node distribution_decode.js
 Testo cifrato: ADGTB XEHJB SDADG HXI PBTI, RDCHTRITIJG PSXEXHXRXCV TAXI. HTS SD TXJHBDS ITBEDG XCRXSXSJCI JI APQDGT TI SDADGT BPVCP PAXFJP.

 Decodifica automatica:
Shift stimato: 15
Testo decifrato: LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISICING ELIT. SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA.
\`\`\`

This approach successfully recovered the original long text by analyzing letter frequencies.

---

## 🧠 Conclusion
This homework combined **data analysis** and **cryptography**.  
- Using LibreOffice Base, I explored **data distributions** through SQL queries.  
- Using JavaScript, I implemented **text distribution analysis**, **Caesar Cipher encryption**, and **automated decryption** with both **brute force** and **language-based analysis**.

Both parts demonstrate the importance of understanding **patterns and distributions** — whether in structured data or encrypted text.
`
  },

];