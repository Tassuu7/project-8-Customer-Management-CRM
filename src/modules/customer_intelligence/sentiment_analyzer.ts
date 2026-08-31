/**
 * Customer Sentiment & Interaction Tone NLP Classifier
 * Evaluates ticket responses, meeting transcripts, and emails for positive/negative polarity,
 * urgency triggers, frustration markers, and Net Promoter Score (NPS) projections.
 */

export interface SentimentAnalysisResult {
  score: number; // -1.0 (Very Negative) to +1.0 (Very Positive)
  magnitude: number; // 0.0 to 10.0 intensity
  classification: 'VERY_POSITIVE' | 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'URGENT_FRUSTRATED';
  detectedKeywords: string[];
  recommendedAction: string;
  npsProjection: number; // 0 to 10
}

export class SentimentAnalyzer {
  private positiveKeywords = new Set([
    'excellent', 'amazing', 'great', 'love', 'fantastic', 'helpful', 'fast', 'resolved',
    'perfect', 'pleased', 'impressed', 'seamless', 'awesome', 'thank you', 'appreciate',
    'reliable', 'efficient', 'outstanding', 'superior', 'valuable', 'recommend', 'delighted'
  ]);

  private negativeKeywords = new Set([
    'broken', 'error', 'fail', 'bug', 'terrible', 'slow', 'frustrated', 'unacceptable',
    'cancel', 'refund', 'escalate', 'disappointed', 'worst', 'annoyed', 'useless',
    'unresponsive', 'complaint', 'outage', 'downtime', 'breach', 'lawyer', 'legal', 'churn'
  ]);

  private urgencyModifiers = new Set([
    'immediately', 'asap', 'urgent', 'emergency', 'blocker', 'critical', 'now', 'production down'
  ]);

  public analyzeText(content: string): SentimentAnalysisResult {
    if (!content || content.trim() === '') {
      return {
        score: 0.0,
        magnitude: 0.0,
        classification: 'NEUTRAL',
        detectedKeywords: [],
        recommendedAction: 'Standard monitoring.',
        npsProjection: 7
      };
    }

    const cleanText = content.toLowerCase();
    const words = cleanText.match(/[a-z]{3,}/g) || [];
    
    let positiveCount = 0;
    let negativeCount = 0;
    let urgencyCount = 0;
    const detectedKeywords: string[] = [];

    for (const word of words) {
      if (this.positiveKeywords.has(word)) {
        positiveCount++;
        detectedKeywords.push(`+${word}`);
      }
      if (this.negativeKeywords.has(word)) {
        negativeCount++;
        detectedKeywords.push(`-${word}`);
      }
      if (this.urgencyModifiers.has(word)) {
        urgencyCount++;
        detectedKeywords.push(`!${word}`);
      }
    }

    const totalMatches = positiveCount + negativeCount;
    let score = 0.0;
    if (totalMatches > 0) {
      score = (positiveCount - negativeCount) / totalMatches;
    }

    const magnitude = Math.min(10.0, (totalMatches * 1.5) + (urgencyCount * 2.5));

    let classification: SentimentAnalysisResult['classification'] = 'NEUTRAL';
    let recommendedAction = 'Maintain standard communication cadence.';
    let npsProjection = 7;

    if (urgencyCount > 0 && negativeCount > 0) {
      classification = 'URGENT_FRUSTRATED';
      recommendedAction = 'Immediate intervention: Assign senior customer success lead and initiate outbound resolution call.';
      npsProjection = 2;
    } else if (score > 0.4) {
      classification = 'VERY_POSITIVE';
      recommendedAction = 'High advocacy detected: Solicit G2/Gartner case study or expansion proposal.';
      npsProjection = 10;
    } else if (score > 0.1) {
      classification = 'POSITIVE';
      recommendedAction = 'Account sentiment positive: Reinforce ongoing milestone delivery.';
      npsProjection = 8;
    } else if (score < -0.3) {
      classification = 'NEGATIVE';
      recommendedAction = 'Elevated frustration: Review support ticket history and schedule technical alignment.';
      npsProjection = 4;
    }

    return {
      score: Math.round(score * 100) / 100,
      magnitude: Math.round(magnitude * 10) / 10,
      classification,
      detectedKeywords,
      recommendedAction,
      npsProjection
    };
  }
}
